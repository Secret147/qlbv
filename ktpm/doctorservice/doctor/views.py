from django.shortcuts import render

from urllib import request, response
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader

from doctor.models import Doctor
from doctor.serializers import DoctorSerializer
from django.http import JsonResponse

from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class ListDoctorView(APIView):

    def get(self, request, format=None):
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)

        return Response(serializer.data)

    def post(self, request):
        doctor = Doctor.objects.create()
        serializer = DoctorSerializer(doctor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Doctor successfully"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return JsonResponse(
                {"message": "Create a new Doctor unsuccessfully"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DetailDoctor(APIView):

    def delete(self, request, id):
        try:
            doctor = Doctor.objects.get(id=id)
            doctor.delete()
            return Response("Delete Success")
        except Doctor.DoesNotExist:
            return Response(
                {"message": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, id):

        doctor = Doctor.objects.get(id=id)
        serializer = DoctorSerializer(doctor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        try:
            doctor = Doctor.objects.get(id=id)
            serializer = DoctorSerializer(doctor)
            return Response(serializer.data)
        except Doctor.DoesNotExist:
            return Response(
                {"message": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND
            )


class CreateDoctor(APIView):
    def post(self, request):
        doctor_list = request.data
        doctor_objects = [
            Doctor.objects.create(**doctor_data)
            for doctor_data in doctor_list
        ]

        try:
            Doctor.objects.bulk_create(doctor_objects)
            return JsonResponse(
                {"message": "Create new Doctors successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Create new Doctors unsuccessfully: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

class DoctorViewSet(generics.ListAPIView):
    serializer_class = DoctorSerializer

    def get_queryset(self):
        queryset = Doctor.objects.all()
        keywords = self.request.query_params.get("keywords")
        if keywords:

            query = Q()
            for keyword in keywords.split():

                query |= Q(name__icontains=keyword)
                query |= Q(email__icontains=keyword)
                query |= Q(phone__icontains=keyword)
              
            queryset = queryset.filter(query)
        return queryset