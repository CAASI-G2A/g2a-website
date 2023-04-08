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
