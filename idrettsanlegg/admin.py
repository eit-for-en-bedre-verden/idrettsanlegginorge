from django.contrib import admin
from django import forms

from idrettsanlegg.models import *
# Register your models here.

class HideAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        """
        Return empty perms dict thus hiding the model from admin index.
        """
        return {}


class KartDataInline(admin.StackedInline):
    model = KartData



class IdrettsanleggAdmin(admin.ModelAdmin):
    inlines = (KartDataInline,)
    list_display = ('anleggsnavn', 'anleggEier', 'byggeaar', 'kommune', 'get_fylke')
    search_fields = ['anleggsnavn', 'anleggEier', 'byggeaar', 'anleggsnummer', 'kommune__name', 'kommune__fylke__name']

    def get_fylke(self, obj):
        return obj.kommune.fylke.name
    get_fylke.short_description = 'Fylke'

admin.site.register(Idrettsanlegg, IdrettsanleggAdmin)
admin.site.register(Fylke, HideAdmin)
admin.site.register(Kommune, HideAdmin)
admin.site.register(AnleggsKlasse, HideAdmin)
admin.site.register(AnleggsKategori, HideAdmin)
admin.site.register(AnleggsType, HideAdmin)
admin.site.register(AnleggStatus, HideAdmin)
admin.site.register(KartData, HideAdmin)
