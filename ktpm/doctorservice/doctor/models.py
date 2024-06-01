from django.db import models


class Doctor(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    speciatly = models.CharField(max_length=100, null=True)

    class Meta:
        __tablename__ = "Doctor"
