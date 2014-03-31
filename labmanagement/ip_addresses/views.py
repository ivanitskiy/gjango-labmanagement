from django.shortcuts import render_to_response, get_object_or_404
from django.http import HttpResponse
from ip_addresses.models import NetworkAddress

from .tools import ping_response
from django.utils import timezone

# Create your views here.
def index(request):
    return render_to_response('ip_addresses/index.html')

def address(request, address=None):
    address_obj = get_object_or_404(NetworkAddress, address=address)
    return render_to_response('ip_addresses/detail.html',
                              {'address_obj': address_obj})

def address_ping(request, address=None):
    address_obj = get_object_or_404(NetworkAddress, address=address)
    if ping_response(address_obj.address):
        msg = "OK"
        address_obj.last_success_ping = timezone.now()
        address_obj.save()
    else:
        msg = "No_response"
    return HttpResponse(msg)

