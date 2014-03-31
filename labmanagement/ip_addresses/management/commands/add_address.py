'''
Created on Mar 26, 2014

@author: ivanitskiy
'''
from django.core.management.base import BaseCommand
from ip_addresses.models import NetworkAddress
from netaddr import IPNetwork
class Command(BaseCommand):
    
    def handle(self, *args, **options):
        
#         172.29.69.0/25
#         172.29.67.128/25
#         172.29.73.128/25 129..254
        
        backend_network = "172.29.73.128/25"
        _size = backend_network.split("/")[1]
        _net_address = backend_network.split("/")[0]
        _net_parent, created =  NetworkAddress.objects.get_or_create(address = _net_address, 
                                                                     network_size =_size,
                                                                     defaults={'description': "backend2 network %s" % backend_network
                                                                                   })
        net4 = IPNetwork(backend_network)
        for x in net4:
            _addr = str(x)
            self.stdout.write(_addr)
            _ip_address, created = NetworkAddress.objects.get_or_create(address = _addr,
                                                                        network_size =_size, 
                                                                        description = "backend2 server with ip %s"%_addr,
                                                                        parent = _net_parent)
