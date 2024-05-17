# project/urls.py

from django.contrib import admin
from django.urls import path, include
from myapp import views 

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('myapp/', include('myapp.urls')),
    
]
