'''
Created on Feb 6, 2014

@author: ivanitskiy
'''
from ip_addresses.models import NetworkAddress
from rest_framework import serializers


class NetworkAddressSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NetworkAddress
        fields = ('address', 'network_size', 'url', 'parent', 'description', 'last_success_ping')