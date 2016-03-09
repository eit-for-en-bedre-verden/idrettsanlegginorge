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
            "Latitude": ALL
        }

class IdrettsanleggResource(ModelResource):
    anleggstype = fields.ToOneField(AnleggTypeResource, 'Anleggstype', full=True)
    kartData = fields.ToOneField(KartDataResource, 'kartdata', full=True)
    class Meta:
        queryset = Idrettsanlegg.objects.all()
        resource_name = 'Idrettsanlegg'
        limit = 0
        allowed_methods = ['post', 'get', 'patch', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True
        filtering = {
           "Byggeaar": ALL_WITH_RELATIONS,
            "tildelt": ALL_WITH_RELATIONS,
            "type": ALL_WITH_RELATIONS
        }
        serializer = PrettyJSONSerializer()

