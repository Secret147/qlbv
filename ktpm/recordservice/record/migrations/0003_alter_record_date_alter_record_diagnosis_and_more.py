# Generated by Django 4.1.13 on 2024-05-30 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('record', '0002_remove_record_patientid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='record',
            name='diagnosis',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='record',
            name='prescription',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='record',
            name='treatment',
            field=models.TextField(null=True),
        ),
    ]
