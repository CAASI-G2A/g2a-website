from django.contrib import admin

# Register your models here.
from .models import Location
from .models import Contract
from .models import Sentence



admin.site.register(Location)
admin.site.register(Contract)
admin.site.register(Sentence)