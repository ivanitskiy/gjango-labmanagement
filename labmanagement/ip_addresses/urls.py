from django.conf.urls import patterns, url
from ip_addresses import views



# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^(?P<address>\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})/$', views.address, name='address'),
    url(r'^(?P<address>\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})/ping/$', views.address_ping, name='address-ping'),
)