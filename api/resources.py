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
        filtering= {
            "type": ALL_WITH_RELATIONS
        }

class AnleggsKlasseResource(ModelResource):
    class Meta:
        queryset = AnleggsKlasse.objects.all()
        resource_name = 'Anleggsklasse'
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True
        filtering = {
            "klasse": ALL_WITH_RELATIONS    #?anleggsklasse__klasse=Naermiljoanlegg&format=json
        }

class AnleggStatusResource(ModelResource):
    class Meta:
        queryset = AnleggStatus.objects.all()
        resource_name = 'anleggStatus'
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True
        filtering = {
            "status": ALL_WITH_RELATIONS    #?anleggstatus__status=Planlagt&format=json
        }

class AnleggsKategoriResource(ModelResource):
    class Meta:
        queryset = AnleggsKategori.objects.all()
        resource_name = 'AnleggsKategori'
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True
        filtering = {
            "kategori": ALL_WITH_RELATIONS  #?anleggskategori__kategori=Friluftsliv&format=json
        }

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
    anleggstatus = fields.ToOneField(AnleggStatusResource, 'anleggStatus', full=True)


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
            "anleggDriver": ALL_WITH_RELATIONS,
            "anleggEier": ALL_WITH_RELATIONS,
            "anleggsnavn": ALL_WITH_RELATIONS,
            "anleggsNummer": ALL_WITH_RELATIONS,
            "areal": ALL_WITH_RELATIONS,
            "bredde": ALL_WITH_RELATIONS,
            "indratt": ALL_WITH_RELATIONS,
            "lengde": ALL_WITH_RELATIONS,
            "nummer1": ALL_WITH_RELATIONS,
            "ombyggeaar": ALL_WITH_RELATIONS,
            "tildelt": ALL_WITH_RELATIONS,
            "utbetalt": ALL_WITH_RELATIONS,
            "uu": ALL_WITH_RELATIONS,


            "kartData" : ALL_WITH_RELATIONS,
            "kommune": ALL_WITH_RELATIONS,
            "anleggstype": ALL_WITH_RELATIONS,
            "anleggsklasse": ALL_WITH_RELATIONS,
            "anleggskategori": ALL_WITH_RELATIONS,
            "anleggstatus": ALL_WITH_RELATIONS


        }
        serializer = PrettyJSONSerializer()

class FreeTextIdrettResource(ModelResource):
    # The ID can be used to get the specific idrettsanlegg by: api/v1/Idrettsanlegg/{ID}/?format=json

    anleggstype = fields.ToOneField(AnleggTypeResource, 'Anleggstype', full=True)
    anleggsklasse = fields.ToOneField(AnleggsKlasseResource, 'Anleggsklasse', full=True)
    anleggskategori = fields.ToOneField(AnleggsKategoriResource, 'Anleggskategori', full=True)
    kartData = fields.ToOneField(KartDataResource, 'kartdata', full=True)
    kommune = fields.ToOneField(KommuneResource, 'kommune', full=True)
    anleggstatus = fields.ToOneField(AnleggStatusResource, 'anleggStatus', full=True)

    class Meta:
        queryset = Idrettsanlegg.objects.all()
        resource_name = 'FreeTextSearch'
        limit = 0
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True
        filtering = {
            "anleggsnavn" : ALL_WITH_RELATIONS, #?anleggsnavn__istartswith=k&limit=10&format=json
            "anleggEier" : ALL_WITH_RELATIONS,
            "anleggsnummer" : ALL_WITH_RELATIONS,
            "ombyggeaar" : ALL_WITH_RELATIONS,
            "byggeaar" : ALL_WITH_RELATIONS,
            "kommune": ALL_WITH_RELATIONS,
            "fylke": ALL_WITH_RELATIONS,
            "anleggstype": ALL_WITH_RELATIONS,
            "anleggsklasse": ALL_WITH_RELATIONS,
            "anleggskategori": ALL_WITH_RELATIONS,
            "anleggstatus": ALL_WITH_RELATIONS,
            "tildelt": ALL_WITH_RELATIONS,
            "query" : ALL_WITH_RELATIONS
        }
        serializer = PrettyJSONSerializer()

    def build_filters(self, filters=None):
        if filters is None:
            filters = {}
        orm_filters = super(FreeTextIdrettResource, self).build_filters(filters)

        if('query' in filters):
            query = filters['query']
            qset = (
                    Q(anleggsnavn__icontains=query) |
                    Q(anleggsnummer__icontains=query) |
                    Q(kommune__name__icontains=query) |
                    Q(kommune__fylke__name__icontains=query) |
                    Q(anleggStatus__status__exact=query) |
                    Q(Anleggsklasse__klasse__exact=query) |
                    Q(Anleggskategori__kategori__icontains=query) |
                    Q(tildelt__icontains=query) |
                    Q(anleggEier__icontains=query)
                    )
            orm_filters.update({'custom': qset})

        return orm_filters

    def apply_filters(self, request, applicable_filters):
        if 'custom' in applicable_filters:
            custom = applicable_filters.pop('custom')
        else:
            custom = None

        semi_filtered = super(FreeTextIdrettResource, self).apply_filters(request, applicable_filters)

        return semi_filtered.filter(custom) if custom else semi_filtered
