# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-03-02 09:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('idrettsanlegg', '0006_auto_20160224_1810'),
    ]

    operations = [
        migrations.AlterField(
            model_name='idrettsanlegg',
            name='kartdata',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='idrettsanlegg.KartData'),
        ),
    ]
