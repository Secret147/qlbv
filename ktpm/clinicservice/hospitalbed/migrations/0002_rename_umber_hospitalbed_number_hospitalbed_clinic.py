# Generated by Django 4.1.13 on 2024-05-31 16:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinic', '0001_initial'),
        ('hospitalbed', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hospitalbed',
            old_name='umber',
            new_name='number',
        ),
        migrations.AddField(
            model_name='hospitalbed',
            name='clinic',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hospital_beds', to='clinic.clinic'),
        ),
    ]
