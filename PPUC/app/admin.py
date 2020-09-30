from django.contrib import admin

# Register your models here.
from .models import Location
from .models import Review
from .models import Contract



admin.site.register(Location)
admin.site.register(Review)
admin.site.register(Contract)
