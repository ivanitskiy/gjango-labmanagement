from ip_addresses.models import NetworkAddress
from rest_framework import viewsets
from apiv1.serializers import NetworkAddressSerializer



class NetworksViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = NetworkAddress.objects.all()
    serializer_class = NetworkAddressSerializer
