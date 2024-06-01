from django.db import models

from clinic.models import Clinic


# Create your models here.
class HospitalBed(models.Model):
    id = models.AutoField(primary_key=True)
    number = models.CharField(max_length=10)
    status = models.CharField(
        max_length=10, choices=[("available", "Available"), ("occupied", "Occupied")]
    )
    patientId = models.IntegerField(null=True)
    clinic = models.ForeignKey(
        Clinic, on_delete=models.CASCADE, related_name="hospital_beds", null=True
    )

    class Meta:
        __tablename__ = "HospitalBed"
