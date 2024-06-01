from django.shortcuts import render

from urllib import request, response
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader

from clinic.models import Clinic
from hospitalbed.models import HospitalBed
from hospitalbed.serializers import HospitalBedSerializer
from django.http import JsonResponse

from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class ListHospitalBedView(APIView):

    def get(self, request, format=None):
        hospitalbeds = HospitalBed.objects.all()
        serializer = HospitalBedSerializer(hospitalbeds, many=True)

        return Response(serializer.data)

    def post(self, request):
        hospitalbed = HospitalBed.objects.create()
        serializer = HospitalBedSerializer(hospitalbed, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new HospitalBed successfully"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return JsonResponse(
                {"message": "Create a new HospitalBed unsuccessfully"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DetailHospitalBed(APIView):

    def delete(self, request, id):
        try:
            hospitalbed = HospitalBed.objects.get(id=id)
            hospitalbed.delete()
            return Response("Delete Success")
        except HospitalBed.DoesNotExist:
            return Response(
                {"message": "HospitalBed not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, id):

        hospitalbed = HospitalBed.objects.get(id=id)
        serializer = HospitalBedSerializer(hospitalbed, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        try:
            hospitalbed = HospitalBed.objects.get(id=id)
            serializer = HospitalBedSerializer(hospitalbed)
            return Response(serializer.data)
        except HospitalBed.DoesNotExist:
            return Response(
                {"message": "HospitalBed not found"}, status=status.HTTP_404_NOT_FOUND
            )


class CreateHospitalBed(APIView):
    def post(self, request):
        hospitalbed_list = request.data
        hospitalbed_objects = [
            HospitalBed.objects.create(**hospitalbed_data)
            for hospitalbed_data in hospitalbed_list
        ]

        try:
            HospitalBed.objects.bulk_create(hospitalbed_objects)
            return JsonResponse(
                {"message": "Create new HospitalBeds successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Create new HospitalBeds unsuccessfully: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class HospitalBedViewSet(generics.ListAPIView):
    serializer_class = HospitalBedSerializer

    def get_queryset(self):
        queryset = HospitalBed.objects.all()
        keywords = self.request.query_params.get("keywords")
        if keywords:

            query = Q()
            for keyword in keywords.split():

                query |= Q(name__icontains=keyword)
                query |= Q(email__icontains=keyword)
                query |= Q(phone__icontains=keyword)

            queryset = queryset.filter(query)
        return queryset


class HospitalBedsByClinicView(APIView):

    def get(self, request, clinic_id):
        try:
            clinic = Clinic.objects.get(id=clinic_id)
            hospital_beds = HospitalBed.objects.filter(clinic=clinic)
            serializer = HospitalBedSerializer(hospital_beds, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Clinic.DoesNotExist:
            return Response(
                {"message": "Clinic not found"}, status=status.HTTP_404_NOT_FOUND
            )
