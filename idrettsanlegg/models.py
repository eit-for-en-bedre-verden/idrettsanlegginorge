from __future__ import unicode_literals
from django.db import models

# Create your models here.
from django.db.models import Q


class AnleggStatus(models.Model):
    status = models.CharField(max_length=20, default='Status')
    def __unicode__(self):
       return  self.status

class AnleggsKlasse(models.Model):
    klasse = models.CharField(max_length=50)
    def __unicode__(self):
       return  self.klasse

class AnleggsKategori(models.Model):
    kategori = models.CharField(max_length=50)
    def __unicode__(self):
       return  self.kategori

class AnleggsType(models.Model):
    type = models.CharField(max_length=30, blank=True)
    def __unicode__(self):
       return  self.type


class Anlegg(models.Model):
    #Kan normalisere Eier og Driver til Bruker ?

    anleggsnavn = models.CharField(max_length=20, blank=True)
    anleggsnummer = models.CharField(max_length=20, blank=True)
    Status = models.ForeignKey(AnleggStatus, on_delete=models.SET_NULL, null=True)
    Eier = models.CharField(max_length=20, blank=True)
    Driver = models.CharField(max_length=20, blank=True)

    Anleggsklasse = models.ForeignKey(AnleggsKlasse, on_delete=models.SET_NULL, null=True)
    Anleggskategori = models.ForeignKey(AnleggsKategori, on_delete=models.SET_NULL, null=True)
    Anleggstype = models.ForeignKey(AnleggsType, on_delete=models.SET_NULL, null=True)
    uu = models.CharField(max_length=20, choices=[('Ja', 'Ja'), ('Nei', 'Nei'), ('Ikke Vurdert','Ikke Vurdert')],
                          default='Ikke Vurdert')

    Byggeaar = models.CharField(max_length=20, blank=True)
    ombyggeaar = models.CharField(max_length=20, blank=True)
    maaldata1 = models.CharField(max_length=20, blank=True)
    maaldata2 = models.CharField(max_length=20, blank=True)
    maaldata3 = models.CharField(max_length=20, blank=True)
    maaldata4 = models.CharField(max_length=20, blank=True)
    lengde = models.IntegerField(blank=True, default=0)
    bredde = models.IntegerField(blank=True, default=0)
    areal = models.IntegerField(blank=True, default=0)

    def __unicode__(self):
       return  self.anleggsnavn

class Fylke(models.Model):
    name = models.CharField(max_length=50)

    def __unicode__(self):
       return  self.name

class Kommune(models.Model):
    name = models.CharField(max_length=50)
    fylke = models.ForeignKey(Fylke)

    def __unicode__(self):
       return  self.name



class KartData(models.Model):
    ngoxkoordinat = models.IntegerField(blank=True, default=0)
    ngoykoordinat = models.IntegerField(blank=True, default=0)
    ngoakse = models.IntegerField(blank=True, default=0)
    ngoakse = models.IntegerField(blank=True, default=0)
    utmnord = models.IntegerField(blank=True, default=0)
    utmost = models.IntegerField(blank=True, default=0)
    utmsone = models.IntegerField(blank=True, default=0)
    kpunkt = models.IntegerField(blank=True, default=0)
    Latitude = models.DecimalField(max_digits=15,decimal_places=13, blank=True, default=0)
    Longitude = models.DecimalField(max_digits=15,decimal_places=13, blank=True, default=0)

    def __unicode__(self):
       return  'Kart-Data'


class Idrettsanlegg(models.Model):
    anlegg = models.OneToOneField(Anlegg, null=True)
    nummer1 = models.IntegerField(blank=True, default=0)
    kommune = models.ForeignKey(Kommune, on_delete=models.SET_NULL, blank=True, null=True)


    tildelt = models.IntegerField(blank=True, default=0)
    utbetalt = models.IntegerField(blank=True, default=0)
    inndratt = models.IntegerField(blank=True, default=0)

    kartdata = models.ForeignKey(KartData, on_delete=models.SET_NULL, blank=True, null=True)

    def __unicode__(self):
        return  self.anlegg.anleggsnavn