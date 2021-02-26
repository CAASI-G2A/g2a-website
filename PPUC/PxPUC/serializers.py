from rest_framework import serializers
from .models import *

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'name', 'state')

    def __init__(self, *args, **kwargs):
        super(LocationSerializer, self).__init__(*args, **kwargs)

        # TODO: make this less hacky for other possible serializer use cases
        # only include sentences if preloaded for performance
        if len(args) > 0 and len(args[0]) > 0:
            obj = args[0][0]
            if hasattr(obj, '_prefetched_objects_cache'):
                is_preloaded = obj._prefetched_objects_cache.get(obj.sentences.field.related_query_name()) is not None
                if is_preloaded:
                    self.fields['sentences'] = serializers.SerializerMethodField()

    def get_sentences(self, obj):
        return SentenceSerializer(obj.sentences, many=True).data

class CategorySerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name')

    def __init__(self, *args, **kwargs):
        super(CategorySerializer, self).__init__(*args, **kwargs)

        # TODO: make this less hacky for other possible serializer use cases
        # only include questions if preloaded for performance
        if len(args) > 0 and len(args[0]) > 0:
            obj = args[0][0]
            if hasattr(obj, '_prefetched_objects_cache'):
                is_preloaded = obj._prefetched_objects_cache.get(obj.questions.prefetch_cache_name) is not None
                if is_preloaded:
                    self.fields['questions'] = serializers.SerializerMethodField()

    def get_name(self, obj):
        return obj.category

    def get_questions(self, obj):
        return QuestionSerializer(obj.questions, many=True).data

class QuestionSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    answer = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ('id', 'question', 'answer')

    def get_question(self, obj):
        return obj.q

    def get_answer(self, obj):
        return obj.a

class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence
        fields = ('id', 'text')
