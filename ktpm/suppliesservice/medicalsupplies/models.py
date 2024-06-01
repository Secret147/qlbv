from django.db import models


# Create your models here.
class MedicalSupplies(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    expiry_date = models.DateField(null=True, blank=True)
    quantity = models.IntegerField(null=True)
    image = models.CharField(max_length=255, null=True)

    class Meta:
        __tablename__ = "MedicalSupplies"
