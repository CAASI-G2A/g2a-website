"""
Definition of models.
"""

from django.db import models

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=150, default="Un-named")
    def __str__(self):
        return self.name

class Review(models.Model):
    policy_type = models.CharField(max_length=40)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    expiration = models.DateField(verbose_name="Expiration Date")
    section = models.CharField(max_length=12)
    language = models.TextField()
    category = models.CharField(max_length=40)
    impact = models.CharField(max_length=256)
    def __str__(self):
        return self.section
