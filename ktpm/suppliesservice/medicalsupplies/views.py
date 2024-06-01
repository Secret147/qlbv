from django.shortcuts import render

from urllib import request, response
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader

from medicalsupplies.models import MedicalSupplies
from medicalsupplies.serializers import MedicalSuppliesSerializer
from django.http import JsonResponse

from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class ListMedicalSuppliesView(APIView):

    def get(self, request, format=None):
        medicalsuppliess = MedicalSupplies.objects.all()
        serializer = MedicalSuppliesSerializer(medicalsuppliess, many=True)

        return Response(serializer.data)

    def post(self, request):
        medicalsupplies = MedicalSupplies.objects.create()
        serializer = MedicalSuppliesSerializer(medicalsupplies, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new MedicalSupplies successfully"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return JsonResponse(
                {"message": "Create a new MedicalSupplies unsuccessfully"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DetailMedicalSupplies(APIView):

    def delete(self, request, id):
        try:
            medicalsupplies = MedicalSupplies.objects.get(id=id)
            medicalsupplies.delete()
            return Response("Delete Success")
        except MedicalSupplies.DoesNotExist:
            return Response(
                {"message": "MedicalSupplies not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, id):

        medicalsupplies = MedicalSupplies.objects.get(id=id)
        serializer = MedicalSuppliesSerializer(medicalsupplies, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        try:
            medicalsupplies = MedicalSupplies.objects.get(id=id)
            serializer = MedicalSuppliesSerializer(medicalsupplies)
            return Response(serializer.data)
        except MedicalSupplies.DoesNotExist:
            return Response(
                {"message": "MedicalSupplies not found"},
                status=status.HTTP_404_NOT_FOUND,
            )


class CreateMedicalSupplies(APIView):
    def post(self, request):
        medicalsupplies_list = request.data
        medicalsupplies_objects = [
            MedicalSupplies.objects.create(**medicalsupplies_data)
            for medicalsupplies_data in medicalsupplies_list
        ]

        try:
            MedicalSupplies.objects.bulk_create(medicalsupplies_objects)
            return JsonResponse(
                {"message": "Create new MedicalSuppliess successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Create new MedicalSuppliess unsuccessfully: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class MedicalSuppliesViewSet(generics.ListAPIView):
    serializer_class = MedicalSuppliesSerializer

    def get_queryset(self):
        queryset = MedicalSupplies.objects.all()
        keywords = self.request.query_params.get("keywords")
        if keywords:

            query = Q()
            for keyword in keywords.split():

                query |= Q(name__icontains=keyword)
                query |= Q(type__icontains=keyword)
                query |= Q(quantity__icontains=keyword)

            queryset = queryset.filter(query)
        return queryset
