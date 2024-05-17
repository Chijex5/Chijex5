from django.db import models

class UserProfile(models.Model):
    regno = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    department = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    level = models.CharField(max_length=10, blank=True, null=True)
    password = models.CharField(max_length=255)
    class Meta:
        app_label = 'myapp'

class User(models.Model):
    regno = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)

class Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    department = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    level = models.CharField(max_length=10, blank=True, null=True)
