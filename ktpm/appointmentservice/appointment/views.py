from django.shortcuts import render

from urllib import request, response
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader

from appointment.models import Appointment
from appointment.serializers import AppointmentSerializer
from django.http import JsonResponse

from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class ListAppointmentView(APIView):

    def get(self, request, format=None):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)

        return Response(serializer.data)

    def post(self, request):
        doctor_id = request.data.get("doctorId")
        day = request.data.get("day")
        time = request.data.get("time")

        # Check if an appointment already exists for the given doctorId, day, and time
        if Appointment.objects.filter(doctorId=doctor_id, day=day, time=time).exists():
            return JsonResponse(
                {
                    "message": "Appointment already exists for this doctor at the selected date and time"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create a new appointment
        appointment = Appointment()
        serializer = AppointmentSerializer(appointment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {"message": "Create a new Appointment successfully"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return JsonResponse(
                {
                    "message": "Create a new Appointment unsuccessfully",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class DetailAppointment(APIView):

    def delete(self, request, id):
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return Response("Delete Success")
        except Appointment.DoesNotExist:
            return Response(
                {"message": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, id):

        appointment = Appointment.objects.get(id=id)
        serializer = AppointmentSerializer(appointment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        try:
            appointment = Appointment.objects.get(id=id)
            serializer = AppointmentSerializer(appointment)
            return Response(serializer.data)
        except appointment.DoesNotExist:
            return Response(
                {"message": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND
            )


class CreateAppointment(APIView):
    def post(self, request):
        appointment_list = request.data
        appointment_objects = [
            Appointment.objects.create(**appointment_data)
            for appointment_data in appointment_list
        ]

        try:
            Appointment.objects.bulk_create(appointment_objects)
            return JsonResponse(
                {"message": "Create new Appointments successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Create new Appointments unsuccessfully: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class AppointmentViewSet(generics.ListAPIView):
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        queryset = Appointment.objects.all()
        keywords = self.request.query_params.get("keywords")
        if keywords:

            query = Q()
            for keyword in keywords.split():

                query |= Q(day__icontains=keyword)
                query |= Q(time__icontains=keyword)
                query |= Q(status__icontains=keyword)

            queryset = queryset.filter(query)
        return queryset


class ApppointmentofDoctorView(APIView):

    def get(self, request, id):
        try:

            hospital_beds = Appointment.objects.filter(doctorId=id)
            serializer = AppointmentSerializer(hospital_beds, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Appointment.DoesNotExist:
            return Response(
                {"message": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND
            )
