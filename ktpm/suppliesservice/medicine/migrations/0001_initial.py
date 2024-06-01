# Generated by Django 4.1.13 on 2024-05-29 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Medicine',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=50)),
                ('manufacturer', models.CharField(max_length=100)),
                ('expiry_date', models.DateField()),
                ('price', models.IntegerField()),
            ],
        ),
    ]
