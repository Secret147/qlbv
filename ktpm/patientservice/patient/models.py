from django.db import models


# Create your models here.
class Patient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    date = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    recordId = models.IntegerField(null=True)

    class Meta:
        __tablename__ = "Patient"
