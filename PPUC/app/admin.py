from django.contrib import admin

# Register your models here.
from .models import Location
from .models import Review



admin.site.register(Location)
admin.site.register(Review)
