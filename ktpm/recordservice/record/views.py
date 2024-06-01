from django.shortcuts import render

from urllib import request, response
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader

from record.models import Record
from record.serializers import RecordSerializer
from django.http import JsonResponse

from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class ListRecordView(APIView):

    def get(self, request, format=None):
        records = Record.objects.all()
        serializer = RecordSerializer(records, many=True)

        return Response(serializer.data)

    def post(self, request):
        record = Record.objects.create()
        serializer = RecordSerializer(record, data=request.data)
        if serializer.is_valid():
            record = serializer.save()
            return JsonResponse(
                {"id": record.id},
                status=status.HTTP_201_CREATED,
            )
        else:
            return JsonResponse(
                {"message": "Create a new Record unsuccessfully"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DetailRecord(APIView):

    def delete(self, request, id):
        try:
            record = Record.objects.get(id=id)
            record.delete()
            return Response("Delete Success")
        except Record.DoesNotExist:
            return Response(
                {"message": "Record not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, id):

        record = Record.objects.get(id=id)
        serializer = RecordSerializer(record, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        try:
            record = Record.objects.get(id=id)
            serializer = RecordSerializer(record)
            return Response(serializer.data)
        except Record.DoesNotExist:
            return Response(
                {"message": "Record not found"}, status=status.HTTP_404_NOT_FOUND
            )


class CreateRecord(APIView):
    def post(self, request):
        record_list = request.data
        record_objects = [
            Record.objects.create(**record_data) for record_data in record_list
        ]

        try:
            Record.objects.bulk_create(record_objects)
            return JsonResponse(
                {"message": "Create new Records successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Create new Records unsuccessfully: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class RecordViewSet(generics.ListAPIView):
    serializer_class = RecordSerializer

    def get_queryset(self):
        queryset = Record.objects.all()
        keywords = self.request.query_params.get("keywords")
        if keywords:

            query = Q()
            for keyword in keywords.split():

                query |= Q(name__icontains=keyword)
                query |= Q(email__icontains=keyword)
                query |= Q(phone__icontains=keyword)

            queryset = queryset.filter(query)
        return queryset
