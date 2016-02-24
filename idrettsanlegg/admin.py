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

admin.site.register(Idrettsanlegg)
admin.site.register(Fylke, HideAdmin)
admin.site.register(Kommune, HideAdmin)
admin.site.register(AnleggsKlasse, HideAdmin)
admin.site.register(AnleggsKategori, HideAdmin)
admin.site.register(AnleggsType, HideAdmin)
admin.site.register(AnleggStatus, HideAdmin)
admin.site.register(KartData, HideAdmin)
