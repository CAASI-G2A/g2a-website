import csv
from django.http import HttpResponse
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
from .models import Keyword
from .models import Provision
from .models import MasterContract
from .models import Department
from .models import Municipality


def download_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type="text/csv")
    response["Content_Disposition"] = 'attachment; filename="results.csv"'
    csv_writer = csv.writer(response)
    csv_writer.writerow(["query", "timestamp"])
    for e in queryset:
        csv_writer.writerow([e.query, e.timestamp])
    return response


class SearchQueryAdmin(admin.ModelAdmin):
    list_display = ("query", "timestamp")
    actions = [download_csv]


class QuestionAdmin(admin.ModelAdmin):
    formfield_overrides = {models.CharField: {"widget": Textarea(attrs={"size": "20"})}}


admin.site.register(Location)
admin.site.register(Category)
admin.site.register(Contract)
admin.site.register(Sentence)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Problematic_Sentence)
admin.site.register(SearchQuery, SearchQueryAdmin)
admin.site.register(Keyword)
admin.site.register(Provision)
admin.site.register(Department)
admin.site.register(MasterContract)
admin.site.register(Municipality)
