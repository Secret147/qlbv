from rest_framework import serializers

from .models import HospitalBed


class HospitalBedSerializer(serializers.ModelSerializer):

    class Meta:
        model = HospitalBed
        fields = "__all__"
