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

#Next five classes added by SU23 Intern
class ProvisionAdmin(admin.ModelAdmin):
    list = ('number', 'category', 'explanation')

class KeywordAdmin(admin.ModelAdmin):
    list = ('keyword', 'example')

class DepartmentAdmin(admin.ModelAdmin):
    list = ('deptName', 'webLink', 'fullOfficers2019', 'partOfficers2019', 'hasBill')

class MasterContractAdmin(admin.ModelAdmin):
    list = ('department', 'startYear', 'endYear', 'bargAgent')

class MunicipalityAdmin(admin.ModelAdmin):
    list = ('municID', 'municipality', 'department', 'totPop2010', 'nonWhitePop2010', 
            'sqMiArea', 'acreArea', 'region', 'COG', 'school', 'sfGlobalID', 'sfSHAPEleng', 'sfSHAPEarea')


admin.site.register(Location)
admin.site.register(Category)
admin.site.register(Contract)
admin.site.register(Sentence)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Problematic_Sentence)
admin.site.register(SearchQuery, SearchQueryAdmin)

#Added by SP23 Capstone, updated to add admin functions in SU23
admin.site.register(Keyword, KeywordAdmin)
admin.site.register(Provision, ProvisionAdmin)
admin.site.register(Department, DepartmentAdmin)
admin.site.register(MasterContract, MasterContractAdmin)
admin.site.register(Municipality, MunicipalityAdmin)
