"""
Definition of models.
"""

from django.db import models

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=150, default="")
    def __str__(self):
        return self.name

class Contract(models.Model):
    location = models.CharField(max_length=40)
    text = models.TextField()
    is_parsed = models.BooleanField(default=False)
    def __str__(self):
       return self.location

class Sentence(models.Model):
    location = models.CharField(max_length=256)
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