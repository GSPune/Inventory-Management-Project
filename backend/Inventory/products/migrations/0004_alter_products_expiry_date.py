# Generated by Django 5.0.1 on 2024-03-31 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_products_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='Expiry_Date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
