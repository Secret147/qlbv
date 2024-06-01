from django.db import models

# Create your models here.
class Clinic(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)

    class Meta:
        __tablename__ = "Clinic"