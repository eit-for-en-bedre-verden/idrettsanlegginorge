from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Idrettsanlegg(models.Model):
    name = models.CharField(max_length=20)