from django.shortcuts import render

from urllib import request, response
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader
import requests

from patient.models import Patient
from patient.serializers import PatientSerializer
from django.http import JsonResponse

from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class ListPatientView(APIView):

    def get(self, request, format=None):
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)

        return Response(serializer.data)

    def post(self, request):
        # Tạo một record trước
        record_response = requests.post("http://localhost:8004/api/record/", json={})
        if record_response.status_code == 201:
            record_id = record_response.json().get("id")
            # Thêm recordId vào dữ liệu của bệnh nhân
            patient_data = request.data.copy()
            patient_data["recordId"] = record_id

            patient = Patient.objects.create()
            serializer = PatientSerializer(patient, data=patient_data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(
                    {"message": "Create a new patient successfully"},
                    status=status.HTTP_201_CREATED,
                )
            else:
                return JsonResponse(
                    {"message": "Create a new patient unsuccessfully"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return JsonResponse(
                {"message": "Failed to create a new record for the patient"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DetailPatient(APIView):

    def delete(self, request, id):
        try:
            patient = Patient.objects.get(id=id)
            patient.delete()
            return Response("Delete Success")
        except patient.DoesNotExist:
            return Response(
                {"message": "patient not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, id):

        patient = Patient.objects.get(id=id)
        serializer = PatientSerializer(patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        try:
            patient = Patient.objects.get(id=id)
            serializer = PatientSerializer(patient)
            return Response(serializer.data)
        except patient.DoesNotExist:
            return Response(
                {"message": "patient not found"}, status=status.HTTP_404_NOT_FOUND
            )


class CreatePatient(APIView):
    def post(self, request):
        patient_list = request.data
        patient_objects = [
            Patient.objects.create(**patient_data) for patient_data in patient_list
        ]

        try:
            Patient.objects.bulk_create(patient_objects)
            return JsonResponse(
                {"message": "Create new patients successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Create new patients unsuccessfully: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class PatientViewSet(generics.ListAPIView):
    serializer_class = PatientSerializer

    def get_queryset(self):
        queryset = Patient.objects.all()
        keywords = self.request.query_params.get("keywords")
        if keywords:

            query = Q()
            for keyword in keywords.split():

                query |= Q(name__icontains=keyword)
                query |= Q(date__icontains=keyword)
                query |= Q(gender__icontains=keyword)
                query |= Q(address__icontains=keyword)
                query |= Q(phone__icontains=keyword)
                query |= Q(email__icontains=keyword)

            queryset = queryset.filter(query)
        return queryset
