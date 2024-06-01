from django.db import models


# Create your models here.
class Record(models.Model):
    id = models.AutoField(primary_key=True)
    doctorId = models.IntegerField(null=True)
    date = models.DateField(null=True)
    diagnosis = models.TextField(null=True)
    treatment = models.TextField(null=True)
    prescription = models.TextField(null=True)

    class Meta:
        __tablename__ = "Record"
