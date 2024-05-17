# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('add_user/', views.add_user, name='add_user'),
    path('login/', views.login, name='login'),
    path('get_items/', views.get_items, name='get_items'),
    path('update_item/', views.update_item, name='update_item'),
]
