from django.contrib import admin

# Register your models here.
from .models import Location
from .models import Contract
from .models import Sentence
from .models import Question


admin.site.register(Location)
admin.site.register(Contract)
admin.site.register(Sentence)
admin.site.register(Question)