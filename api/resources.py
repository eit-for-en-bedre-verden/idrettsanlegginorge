from tastypie.resources import ModelResource
from idrettsanlegg.models import Idrettsanlegg


class MyModelResource(ModelResource):
    class Meta:
        queryset = Idrettsanlegg.objects.all()
        resource_name = 'Idrettsanlegg'
        allowed_methods = ['get']