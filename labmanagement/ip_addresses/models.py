from django.db import models


class NetworkAddress(models.Model):
    address  = models.IPAddressField(unique=True)
    network_size = models.PositiveIntegerField(unique=True)
    description = models.CharField(max_length=400)
    parent = models.ForeignKey('self', blank=True, null=True)
    last_success_ping = models.DateField(blank=True, null=True)
    
    def __unicode__(self):
        return self.address