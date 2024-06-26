# Generated by Django 4.1.13 on 2024-05-29 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255, null=True, verbose_name='username')),
                ('password', models.CharField(max_length=255, null=True, verbose_name='password')),
                ('role', models.IntegerField(null=True)),
                ('email', models.CharField(max_length=255, null=True, verbose_name='email')),
                ('address', models.CharField(max_length=255, null=True, verbose_name='address')),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('update_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
    ]
