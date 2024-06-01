from django.db import models

# Create your models here.
class Appointment(models.Model):
    id = models.AutoField(primary_key=True)
    patientId = models.IntegerField(null=True)
    doctorId = models.IntegerField(null=True)
    clinicId = models.IntegerField(null=True)
    day = models.DateField()
    time = models.CharField(max_length=255)
    status = models.CharField(max_length=255,null=True)
    notes = models.TextField(blank=True)

    class Meta:
        __tablename__ = "Appointment"