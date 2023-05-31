"""
Definition of models.
"""

from tabnanny import verbose
from django.db import models, reset_queries


# Location object is the foundation for all other objects, most refer to it
class Location(models.Model):
    name = models.CharField(max_length=150, default="")
    state = models.CharField(max_length=50, default="")
    complaint_form_link = models.URLField(max_length=300, null=True)

    # Region (string)
    # Police Budget (if available, float)
    # Number of officers (if available, int)
    def __str__(self):
        return self.name


# Keyword table is a junction table of all keywords for Location. Each Location may have (1-5?) keywords
# and each Keyword may belong to more than one Location (but are separate entries!)
# class Keyword
# location (foreign key)
# category (foreign key)
# word (string)


# Corresponds to the handful of Campaign Zero categories. These are mostly static, and referred to by
# each keyword object
class Category(models.Model):
    # Should be separate fields for category_name, and category_description
    category = models.CharField(max_length=300)

    def __str__(self):
        return self.category


class Question(models.Model):
    category = models.ManyToManyField(Category, related_name="questions")
    q = models.CharField(max_length=1000, default="")
    a = models.CharField(max_length=2000, default="")

    def __str__(self):
        return self.q


class Contract(models.Model):
    location = models.ForeignKey(
        Location, related_name="contract", on_delete=models.CASCADE
    )
    #import pdb; pdb.set_trace()
    text = models.TextField()
    expiry = models.CharField(max_length=150)
    is_parsed = models.BooleanField(default=False)

    def __str__(self):
        return self.location.name


class Sentence(models.Model):
    location = models.ForeignKey(
        Location, related_name="sentences", on_delete=models.CASCADE
    )
    text = models.TextField()

    def __str__(self):
        return self.text


# Junction table with single entry per keyword per sentence
# For example: If sentence #1 contains two keywords, will be entry for Setence 1, Key 1, and Sentence 1, Key 2
# class Sentence_Keyword
# sentence (foreign key)
# keyword (foreign key)


# May need to be modified instead of adding a new class
class Problematic_Sentence(models.Model):
    location = models.ForeignKey(
        Location, related_name="problematic_sentences", on_delete=models.CASCADE
    )
    text = models.TextField()
    impact = models.TextField(blank=True)
    limit_oversight = models.BooleanField(default=False)
    city_pay_for_misconduct = models.BooleanField(default=False)
    erase_misconduct = models.BooleanField(default=False)
    disqualify_complaints = models.BooleanField(default=False)
    restrict_interrogation = models.BooleanField(default=False)
    unfair_information = models.BooleanField(default=False)

    def __str__(self):
        return self.text


# Also deprecated, replaced by category and keyword
class GlossaryTerm(models.Model):
    location = models.ForeignKey(
        Location, related_name="glossary_terms", on_delete=models.CASCADE
    )
    term = models.TextField()
    definition = models.TextField()


# Used for saving user search queries
class SearchQuery(models.Model):
    query = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    results = models.IntegerField()

    def __str__(self) -> str:
        return self.query

    class Meta:
        verbose_name_plural = "Search Queries"


### In progress: Important functions for using the data in a more flexible way.
### See PPUC/PxPUC/static/app/mastersheets/Model master spreadsheet

########## BEGIN NEW MODELS: The below classes create models based on the spreadsheet and adhere to changes on there
### Each class creates variables for each header on the spreadsheet and should be able to be used to make these
### connections. Ideally, these classes can be used to connect the spreadsheet to searching and other tools, so instead of hardcoding
### the category search box with each category, for example, the fields will all be populated dynamically with these classes.
### Therefore, changing the master spreadsheet would change the terms on that specific box. This functionality is desired all
### across the site as well.

# Many to many relationship with provisions
class Keyword(models.Model):
    keyword = models.CharField(max_length=50, null=True)
    example = models.CharField(max_length=300, null=True)

    class Meta:
        ordering = ["keyword"]

    def __str__(self):
        return self.keyword

# Many to many relationship with contracts and keywords
class Provision(models.Model):
    number = models.IntegerField(null=True)
    category = models.CharField(max_length=50, null=True)
    explanation = models.CharField(max_length=200, null=True)

    keywords = models.ManyToManyField(Keyword)

    class Meta:
        ordering = ["number"]

    def __str__(self):
        return self.category

# Many to many with contracts, one to one with departments
class MasterContract(models.Model):
    department = models.CharField(max_length=50, null=True)
    startYear = models.CharField(max_length=4, null=True)
    endYear = models.CharField(max_length=4, null=True)
    bargAgent = models.CharField(max_length=100, null=True)
    # blank    origPDFlink = models.CharField(max_length=100, null=True)
    # two others blank on sheet Mar 23

    provisions = models.ManyToManyField(Provision)

    class Meta:
        ordering = ["department"]

    def __str__(self):
        return self.department

# One to many with municipality, one to one with departments
class Department(models.Model):
    deptName = models.CharField(max_length=50, null=True)
    webLink = models.CharField(max_length=100, null=True)
    fullOfficers2019 = models.IntegerField(blank=True, null=True)
    partOfficers2019 = models.IntegerField(blank=True, null=True)
    hasBill = models.BooleanField() # Refers to if it has a bill of rights or not 

    mContractObj = models.ForeignKey(
        MasterContract, on_delete=models.CASCADE, related_name="dept", null=True
    )

    def __str__(self):
        return self.deptName

# Many to one with departments 
class Municipality(models.Model):
    municID = models.CharField(max_length=6, null=True)
    municipality = models.CharField(max_length=100, null=True)
    department = models.CharField(max_length=100, null=True)
    totPop2010 = models.IntegerField()
    nonWhitePop2010 = models.IntegerField(blank=True, null=True)
    sqMiArea = models.FloatField(blank=True, null=True)
    acreArea = models.FloatField(blank=True, null=True)

    region = models.CharField(max_length=20, null=True)
    COG = models.CharField(max_length=50, null=True)
    school = models.CharField(max_length=50, null=True)

    # SHAPE maps data
    sfGlobalID = models.CharField(max_length=50, null=True)
    sfSHAPEleng = models.FloatField()
    sfSHAPEarea = models.FloatField()

    departmentObj = models.ForeignKey(
        Department, on_delete=models.CASCADE, related_name="munici", null=True
    )

    class Meta:
        ordering = ["municipality"]

    def __str__(self):
        return self.municipality
