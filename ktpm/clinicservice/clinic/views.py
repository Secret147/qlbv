from django.shortcuts import render

from urllib import request, response
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader

from clinic.models import Clinic
from clinic.serializers import ClinicSerializer
from django.http import JsonResponse

from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class ListClinicView(APIView):

    def get(self, request, format=None):
        clinics = Clinic.objects.all()
        serializer = ClinicSerializer(clinics, many=True)

        return Response(serializer.data)

    def post(self, request):
        clinic = Clinic.objects.create()
        serializer = ClinicSerializer(clinic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Clinic successfully"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return JsonResponse(
                {"message": "Create a new Clinic unsuccessfully"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DetailClinic(APIView):

    def delete(self, request, id):
        try:
            clinic = Clinic.objects.get(id=id)
            clinic.delete()
            return Response("Delete Success")
        except Clinic.DoesNotExist:
            return Response(
                {"message": "Clinic not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, id):

        clinic = Clinic.objects.get(id=id)
        serializer = ClinicSerializer(clinic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        try:
            clinic = Clinic.objects.get(id=id)
            serializer = ClinicSerializer(clinic)
            return Response(serializer.data)
        except Clinic.DoesNotExist:
            return Response(
                {"message": "Clinic not found"}, status=status.HTTP_404_NOT_FOUND
            )


class CreateClinic(APIView):
    def post(self, request):
        clinic_list = request.data
        clinic_objects = [
            Clinic.objects.create(**clinic_data)
            for clinic_data in clinic_list
        ]

        try:
            Clinic.objects.bulk_create(clinic_objects)
            return JsonResponse(
                {"message": "Create new Clinics successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Create new Clinics unsuccessfully: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

class ClinicViewSet(generics.ListAPIView):
    serializer_class = ClinicSerializer

    def get_queryset(self):
        queryset = Clinic.objects.all()
        keywords = self.request.query_params.get("keywords")
        if keywords:

            query = Q()
            for keyword in keywords.split():

                query |= Q(name__icontains=keyword)
                query |= Q(type__icontains=keyword)
                
              
            queryset = queryset.filter(query)
        return queryset