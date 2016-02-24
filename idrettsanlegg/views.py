from django.shortcuts import render
from idrettsanlegg.models import Idrettsanlegg
# Create your views here.

def index(request):
     context = {}
     context['idrettsanlegg'] = Idrettsanlegg.objects.all()

     return render(request, 'idrettsanlegg/index.html', context)