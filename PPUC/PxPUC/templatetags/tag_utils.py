from django import template
from django.urls import reverse
from PxPUC.models import *

register = template.Library()

@register.filter(name='lookup')
def lookup(value, arg):
    return value.get(arg)

@register.simple_tag(name='default_complaint')
def default_complaint():
    default_loc = Location.objects.get(name='Pittsburgh', state='Pennsylvania')
    return reverse('complaint', args=[default_loc.id])
