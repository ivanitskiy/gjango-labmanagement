'''
Created on Mar 26, 2014

@author: ivanitskiy
'''
from django.core.management.base import BaseCommand
from ip_addresses.models import NetworkAddress
from ip_addresses.tools import ping_response
from django.utils import timezone
from time import sleep

class Command(BaseCommand):
    def handle(self, *args, **options):
        addr_list = NetworkAddress.objects.filter(parent__isnull=False)
        for network_address_obj in addr_list:
            if ping_response(network_address_obj.address):
                network_address_obj.last_success_ping = timezone.now()
                network_address_obj.save()
                self.stdout.write(str(network_address_obj.address) + "  OK")
            sleep(10)
        
    