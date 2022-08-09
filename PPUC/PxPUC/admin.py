from django.contrib import admin
from django.db import models
from django.forms import Textarea

# Register your models here.
from .models import Location, SearchQuery
from .models import Category
from .models import Contract
from .models import Sentence
from .models import Question
from .models import Problematic_Sentence


class QuestionAdmin(admin.ModelAdmin):
    formfield_overrides = {models.CharField: {"widget": Textarea(attrs={"size": "20"})}}


admin.site.register(Location)
admin.site.register(Category)
admin.site.register(Contract)
admin.site.register(Sentence)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Problematic_Sentence)
admin.site.register(SearchQuery)
