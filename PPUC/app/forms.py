"""
Definition of forms.
"""

from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.forms import ModelForm
from app.models import Location, Sentence
from django.utils.translation import ugettext_lazy as _

class BootstrapAuthenticationForm(AuthenticationForm):
    """Authentication form which uses boostrap CSS."""
    username = forms.CharField(max_length=254,
                               widget=forms.TextInput({
                                   'class': 'form-control',
                                   'placeholder': 'User name'}))
    password = forms.CharField(label=_("Password"),
                               widget=forms.PasswordInput({
                                   'class': 'form-control',
                                   'placeholder':'Password'}))
class ProblematicLanguageForm(ModelForm):
    # For BooleanFields, required=False means that Django's validation
    # will accept a checked or unchecked value, while required=True
    # will validate that the user MUST check the box.
    class Meta:
        model = Sentence
        fields = ('limit_oversight', 'city_pay_for_misconduct', 'erase_misconduct', 'disqualify_complaints', 'restrict_interrogation', 'unfair_information')