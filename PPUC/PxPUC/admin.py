from django.contrib import admin

# Register your models here.
from .models import Location
from .models import Category
from .models import Contract
from .models import Sentence
from .models import Question
from .models import Problematic_Sentence


admin.site.register(Location)
admin.site.register(Category)
admin.site.register(Contract)
admin.site.register(Sentence)
admin.site.register(Question)
admin.site.register(Problematic_Sentence)