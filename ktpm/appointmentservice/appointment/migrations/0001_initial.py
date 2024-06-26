# Generated by Django 4.1.13 on 2024-05-29 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('patientId', models.IntegerField(null=True)),
                ('doctorId', models.IntegerField(null=True)),
                ('clinicId', models.IntegerField(null=True)),
                ('day', models.DateField()),
                ('time', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=255, null=True)),
                ('notes', models.TextField(blank=True)),
            ],
        ),
    ]
