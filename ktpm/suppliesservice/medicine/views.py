from django.shortcuts import render

from urllib import request, response
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader

from medicine.models import Medicine
from medicine.serializers import MedicineSerializer
from django.http import JsonResponse

from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class ListMedicineView(APIView):

    def get(self, request, format=None):
        medicines = Medicine.objects.all()
        serializer = MedicineSerializer(medicines, many=True)

        return Response(serializer.data)

    def post(self, request):
        medicine = Medicine.objects.create()
        serializer = MedicineSerializer(medicine, data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Medicine successfully"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return JsonResponse(
                {"message": "Create a new Medicine unsuccessfully"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DetailMedicine(APIView):

    def delete(self, request, id):
        try:
            medicine = Medicine.objects.get(id=id)
            medicine.delete()
            return Response("Delete Success")
        except Medicine.DoesNotExist:
            return Response(
                {"message": "Medicine not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, id):

        medicine = Medicine.objects.get(id=id)
        serializer = MedicineSerializer(medicine, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        try:
            medicine = Medicine.objects.get(id=id)
            serializer = MedicineSerializer(medicine)
            return Response(serializer.data)
        except Medicine.DoesNotExist:
            return Response(
                {"message": "Medicine not found"}, status=status.HTTP_404_NOT_FOUND
            )


class CreateMedicine(APIView):
    def post(self, request):
        medicine_list = request.data
        medicine_objects = [
            Medicine.objects.create(**medicine_data) for medicine_data in medicine_list
        ]

        try:
            Medicine.objects.bulk_create(medicine_objects)
            return JsonResponse(
                {"message": "Create new Medicines successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Create new Medicines unsuccessfully: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class MedicineViewSet(generics.ListAPIView):
    serializer_class = MedicineSerializer

    def get_queryset(self):
        queryset = Medicine.objects.all()
        keywords = self.request.query_params.get("keywords")
        if keywords:

            query = Q()
            for keyword in keywords.split():

                query |= Q(name__icontains=keyword)
                query |= Q(type__icontains=keyword)
                query |= Q(manufacturer__icontains=keyword)
                query |= Q(price__icontains=keyword)
                query |= Q(quantity__icontains=keyword)
                query |= Q(image__icontains=keyword)

            queryset = queryset.filter(query)
        return queryset
