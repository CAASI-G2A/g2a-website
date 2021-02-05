"""
Definition of models.
"""

from django.db import models

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=150, default="")
    state = models.CharField(max_length=50, default="")
    complaint_form_link = models.URLField(max_length=300)
    def __str__(self):
        return self.name

class Category(models.Model):
    category = models.CharField(max_length=300)
    def __str__(self):
        return self.category

class Question(models.Model):
    category = models.ManyToManyField(Category)
    q = models.CharField(max_length=450, default="")
    a = models.CharField(max_length=450, default="")
    location = models.ForeignKey(Location, related_name='questions', on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.q

class Contract(models.Model):
    location = models.ForeignKey(Location, related_name='contract', on_delete=models.CASCADE)
    text = models.TextField()
    expiry = models.CharField(max_length=150)
    is_parsed = models.BooleanField(default=False)
    def __str__(self):
       return self.location.name

class Sentence(models.Model):
	location = models.ForeignKey(Location, related_name='sentences', on_delete=models.CASCADE)
	text = models.TextField()
	def __str__(self):
		return self.text

class Problematic_Sentence(models.Model):
    location = models.ForeignKey(Location, related_name='problematic_sentences', on_delete=models.CASCADE)
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
