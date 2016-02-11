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

class IdrettsAnleggForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(IdrettsAnleggForm, self).__init__(*args, **kwargs)
        self.fields['anlegg'].queryset = Anlegg.objects.filter(Q(idrettsanlegg=None) | Q(idrettsanlegg=self.instance))
        self.fields['kartdata'].queryset = KartData.objects.filter(Q(idrettsanlegg=None) | Q(idrettsanlegg=self.instance))

class IdrettsAnleggAdmin(admin.ModelAdmin):
    form = IdrettsAnleggForm

admin.site.register(Idrettsanlegg, IdrettsAnleggAdmin)
admin.site.register(Anlegg)
admin.site.register(Fylke, HideAdmin)
admin.site.register(Kommune, HideAdmin)
admin.site.register(AnleggsKlasse, HideAdmin)
admin.site.register(AnleggsKategori, HideAdmin)
admin.site.register(AnleggsType, HideAdmin)
admin.site.register(AnleggStatus, HideAdmin)
admin.site.register(KartData, HideAdmin)
