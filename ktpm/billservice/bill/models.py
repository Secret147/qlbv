from django.db import models

# Create your models here.
class Bill(models.Model):
    id = models.AutoField(primary_key=True)
    patientId = models.IntegerField(null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=[('paid', 'Paid'), ('unpaid', 'Unpaid')])
    payment_method = models.CharField(max_length=20, choices=[('cash', 'Cash'), ('credit_card', 'Credit Card'), ('insurance', 'Insurance')])

    class Meta:
        __tablename__ = "Bill"