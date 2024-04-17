# Generated by Django 5.0.1 on 2024-04-16 17:45

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0002_rename_customer_id_orders_in_customer_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders_in',
            name='Date',
        ),
        migrations.AddField(
            model_name='orders_in',
            name='Items_Bought',
            field=models.IntegerField(default=2),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='orders_in',
            name='Timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='orders_in',
            name='Total',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=19, null=True),
        ),
    ]
