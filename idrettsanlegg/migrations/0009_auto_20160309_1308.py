# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-03-09 13:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('idrettsanlegg', '0008_auto_20160309_1132'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='idrettsanlegg',
            name='Byggeaar',
        ),
        migrations.AddField(
            model_name='idrettsanlegg',
            name='byggeaar',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]