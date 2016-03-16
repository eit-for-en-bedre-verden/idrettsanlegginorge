from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from tastypie.resources import ALL_WITH_RELATIONS, ALL
from idrettsanlegg.models import *
from tastypie import fields
import json
from django.core.serializers.json import DjangoJSONEncoder
from tastypie.serializers import Serializer

class PrettyJSONSerializer(Serializer):
    json_indent = 2

    def to_json(self, data, options=None):
        options = options or {}
        data = self.to_simple(data, options)
        return json.dumps(data, cls=DjangoJSONEncoder,
                sort_keys=True, ensure_ascii=False, indent=self.json_indent)

class AnleggTypeResource(ModelResource):
    class Meta:
        queryset = AnleggsType.objects.all()
        resource_name = 'Anleggstype'
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True

class AnleggsKlasseResource(ModelResource):
    class Meta:
        queryset = AnleggsKlasse.objects.all()
        resource_name = 'Anleggsklasse'
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True

class AnleggsStatusResource(ModelResource):
    class Meta:
        queryset = AnleggStatus.objects.all()
        resource_name = 'anleggstatus'
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True

class AnleggsKategoriResource(ModelResource):
    class Meta:
        queryset = AnleggsKategori.objects.all()
        resource_name = 'AnleggsKategori'
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True

class FylkeResource(ModelResource):
    class Meta:
        queryset = Fylke.objects.all()
        resource_name = 'fylke'
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True
        filtering = {
            "name": ALL_WITH_RELATIONS  #?kommune__fylke__name=Rogaland&format=json
        }

class KommuneResource(ModelResource):
    fylke = fields.ToOneField(FylkeResource, 'fylke', full=True)
    class Meta:
        queryset = Kommune.objects.all()
        resource_name = 'Kommune'
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True
        filtering= {
            "fylke": ALL_WITH_RELATIONS,
            "name": ALL_WITH_RELATIONS  #?kommune__name=Hjelmeland&format=json
        }

class KartDataResource(ModelResource):
    class Meta:
        queryset = KartData.objects.all()
        limit = 0
        resource_name = 'KartData'
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True
        filtering = {
            "Latitude": ALL_WITH_RELATIONS, #?kartData__Longitude__gt=0&kartData__Latitude__gt=0&format=json
            "Longitude": ALL_WITH_RELATIONS
        }

class IdrettsanleggResource(ModelResource):
    anleggstype = fields.ToOneField(AnleggTypeResource, 'Anleggstype', full=True)
    anleggsklasse = fields.ToOneField(AnleggsKlasseResource, 'Anleggsklasse', full=True)
    anleggskategori = fields.ToOneField(AnleggsKategoriResource, 'Anleggskategori', full=True)
    kartData = fields.ToOneField(KartDataResource, 'kartdata', full=True)
    kommune = fields.ToOneField(KommuneResource, 'kommune', full=True)
    #anleggstatus = fields.ForeignKey(AnleggsStatusResource, 'status', full=True)

    class Meta:
        queryset = Idrettsanlegg.objects.all()
        resource_name = 'Idrettsanlegg'
        limit = 0
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True
        filtering = {
           "byggeaar": ALL_WITH_RELATIONS,  #?byggeaar__gt=2011&byggeaar__lt=2013&format=json
            "tildelt": ALL_WITH_RELATIONS,
            "type": ALL_WITH_RELATIONS,
            
            "kartData" : ALL_WITH_RELATIONS,
            "kommune": ALL_WITH_RELATIONS
        }
        serializer = PrettyJSONSerializer()
