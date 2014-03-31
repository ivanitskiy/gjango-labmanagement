from django.conf.urls import patterns, include, url
from django.contrib import admin



admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'labmanagement.views.home', name='home'),
    url(r'^ip_addresses/', include('ip_addresses.urls'), name='ip_addresses'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('apiv1.urls')),
)
