from rest_framework import serializers

from .models import MedicalSupplies


class MedicalSuppliesSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicalSupplies
        fields = "__all__"
