from django.shortcuts import render

from urllib import request, response
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader

from bill.models import Bill
from bill.serializers import BillSerializer
from django.http import JsonResponse

from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class ListBillView(APIView):

    def get(self, request, format=None):
        bills = Bill.objects.all()
        serializer = BillSerializer(bills, many=True)

        return Response(serializer.data)

    def post(self, request):
        bill = Bill.objects.create()
        serializer = BillSerializer(bill, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Bill successfully"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return JsonResponse(
                {"message": "Create a new Bill unsuccessfully"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DetailBill(APIView):

    def delete(self, request, id):
        try:
            bill = Bill.objects.get(id=id)
            bill.delete()
            return Response("Delete Success")
        except Bill.DoesNotExist:
            return Response(
                {"message": "Bill not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, id):

        bill = Bill.objects.get(id=id)
        serializer = BillSerializer(bill, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        try:
            bill = Bill.objects.get(id=id)
            serializer = BillSerializer(bill)
            return Response(serializer.data)
        except Bill.DoesNotExist:
            return Response(
                {"message": "Bill not found"}, status=status.HTTP_404_NOT_FOUND
            )


class CreateBill(APIView):
    def post(self, request):
        bill_list = request.data
        bill_objects = [
            Bill.objects.create(**bill_data)
            for bill_data in bill_list
        ]

        try:
            Bill.objects.bulk_create(bill_objects)
            return JsonResponse(
                {"message": "Create new Bills successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Create new Bills unsuccessfully: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

class BillViewSet(generics.ListAPIView):
    serializer_class = BillSerializer

    def get_queryset(self):
        queryset = Bill.objects.all()
        keywords = self.request.query_params.get("keywords")
        if keywords:

            query = Q()
            for keyword in keywords.split():

                query |= Q(name__icontains=keyword)
                query |= Q(email__icontains=keyword)
                query |= Q(phone__icontains=keyword)
              
            queryset = queryset.filter(query)
        return queryset