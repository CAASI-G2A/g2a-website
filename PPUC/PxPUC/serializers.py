from rest_framework import serializers
from .models import *

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'name', 'state')

class CategorySerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_name')

    class Meta:
        model = Category
        fields = ('id', 'name')

    def get_name(self, obj):
        return obj.category

class QuestionSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(source='category', read_only=True, many=True)
    question = serializers.SerializerMethodField('get_question')
    answer = serializers.SerializerMethodField('get_answer')

    class Meta:
        model = Question
        fields = ('id', 'question', 'answer', 'categories')

    def get_question(self, obj):
        return obj.q

    def get_answer(self, obj):
        return obj.a
