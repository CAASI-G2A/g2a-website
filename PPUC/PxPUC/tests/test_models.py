from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITransactionTestCase
import json
from ..models import *


class LocationTests(APITransactionTestCase):
    """
    Ensure we can get the city and state of all locations
    """

    def test_get_locations(self):
        # create locations
        new_locs = Location.objects.bulk_create(
            [
                Location(name="CITY1", state="STATE"),
                Location(name="CITY2", state="STATE"),
            ]
        )

        # attempt read
        url = reverse("location-list")
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parsed = json.loads(response.content)
        self.assertEqual(len(parsed), 2)
        self.assertEqual(parsed[0]["name"], "CITY1")
        self.assertEqual(parsed[0]["state"], "STATE")
        self.assertEqual(parsed[1]["name"], "CITY2")
        self.assertEqual(parsed[1]["state"], "STATE")

    """
    Ensure we can get the city and state of an individual location
    """

    def test_get_location(self):
        # create location
        new_loc = Location.objects.create(name="CITY", state="STATE")

        # attempt read
        url = reverse("location-retrieve", args=[new_loc.id])
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parsed = json.loads(response.content)
        self.assertEqual(parsed["name"], "CITY")
        self.assertEqual(parsed["state"], "STATE")

    """
    Ensure that the questions returned are categorized by their category
    """

    def test_get_questions(self):
        # create location
        new_loc = Location.objects.create(name="CITY", state="STATE")

        # create some questions
        cats = Category.objects.bulk_create(
            [Category(category="1"), Category(category="2")]
        )
        cats = Category.objects.all()
        questions = Question.objects.bulk_create(
            [
                Question(q="Q1", a="A1", location=new_loc),
                Question(q="Q2", a="A2", location=new_loc),
            ]
        )
        questions = Question.objects.all()
        questions[0].category.set([cats[0]])
        questions[1].category.set([cats[1]])

        # attempt read
        url = reverse("location-questions-list", args=[new_loc.id])
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parsed = json.loads(response.content)
        self.assertEqual(parsed[0]["name"], cats[0].category)
        self.assertEqual(len(parsed[0]["questions"]), 1)
        self.assertEqual(parsed[0]["questions"][0]["question"], questions[0].q)
        self.assertEqual(parsed[0]["questions"][0]["answer"], questions[0].a)

        self.assertEqual(parsed[1]["name"], cats[1].category)
        self.assertEqual(len(parsed[1]["questions"]), 1)
        self.assertEqual(parsed[1]["questions"][0]["question"], questions[1].q)
        self.assertEqual(parsed[1]["questions"][0]["answer"], questions[1].a)

    """
    Ensure that the stages are returned
    """

    def test_get_stages(self):
        # create location
        new_loc = Location.objects.create(name="CITY", state="STATE")

        # attempt read
        url = reverse("location-stages-list", args=[new_loc.id])
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parsed = json.loads(response.content)
        self.assertEqual(len(parsed.keys()), 5)


class ResearcherTests(APITransactionTestCase):
    """
    Ensures empty search requests returns nothing
    """

    def test_empty_search(self):
        # create location
        new_loc = Location.objects.create(name="CITY", state="STATE")

        # make query
        query = {"query": ""}
        url = reverse("researcher-search") + "?query=" + json.dumps(query)

        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parsed = json.loads(response.content)
        self.assertEqual(len(parsed), 1)

    """
    Ensures empty request returns an error
    """

    def test_no_query_param(self):
        # make query
        url = reverse("researcher-search")

        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    """
    Ensures malformed request returns an error
    """

    def test_malformed_search(self):
        # make query
        query = {}
        url = reverse("researcher-search") + "?query=" + json.dumps(query)

        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    """
    Ensures correct request is processed and results are correct
    """

    def test_single_word_search(self):
        # create location
        new_loc = Location.objects.create(name="CITY", state="STATE")
        # create contract sentences
        sentences = Sentence.objects.bulk_create(
            [
                Sentence(text="test me 123", location=new_loc),
                Sentence(text="this is for real", location=new_loc),
            ]
        )
        sentences = Sentence.objects.all()

        # make query
        query = {"query": "test"}
        url = reverse("researcher-search") + "?query=" + json.dumps(query)

        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parsed = json.loads(response.content)
        self.assertEqual(len(parsed), 1)
        self.assertEqual(parsed[0]["name"], new_loc.name)
        self.assertEqual(parsed[0]["state"], new_loc.state)
        self.assertEqual(len(parsed[0]["sentences"]), 1)
        self.assertEqual(parsed[0]["sentences"][0]["text"], sentences[0].text)

    """
    Ensures correct request is processed and results are correct
    """

    def test_and_search(self):
        # create location
        new_loc = Location.objects.create(name="CITY", state="STATE")
        # create contract sentences
        sentences = Sentence.objects.bulk_create(
            [
                Sentence(text="test me 123", location=new_loc),
                Sentence(text="this is for real", location=new_loc),
                Sentence(text="this is for test 123", location=new_loc),
            ]
        )
        sentences = Sentence.objects.all()

        # make query
        query = {"query": {"operation": "AND", "operand1": "test", "operand2": "123"}}
        url = reverse("researcher-search") + "?query=" + json.dumps(query)

        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parsed = json.loads(response.content)
        self.assertEqual(len(parsed), 1)
        self.assertEqual(parsed[0]["name"], new_loc.name)
        self.assertEqual(parsed[0]["state"], new_loc.state)
        self.assertEqual(len(parsed[0]["sentences"]), 2)
        self.assertEqual(parsed[0]["sentences"][0]["text"], sentences[0].text)
        self.assertEqual(parsed[0]["sentences"][1]["text"], sentences[2].text)

    """
    Ensures correct request is processed and results are correct
    """

    def test_or_search(self):
        # create location
        new_loc = Location.objects.create(name="CITY", state="STATE")
        # create contract sentences
        sentences = Sentence.objects.bulk_create(
            [
                Sentence(text="test me 123", location=new_loc),
                Sentence(text="this is for real", location=new_loc),
                Sentence(text="this is for test 123", location=new_loc),
            ]
        )
        sentences = Sentence.objects.all()

        # make query
        query = {"query": {"operation": "OR", "operand1": "test", "operand2": "is"}}
        url = reverse("researcher-search") + "?query=" + json.dumps(query)

        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parsed = json.loads(response.content)
        self.assertEqual(len(parsed), 1)
        self.assertEqual(parsed[0]["name"], new_loc.name)
        self.assertEqual(parsed[0]["state"], new_loc.state)
        self.assertEqual(len(parsed[0]["sentences"]), 3)
        self.assertEqual(parsed[0]["sentences"][0]["text"], sentences[0].text)
        self.assertEqual(parsed[0]["sentences"][1]["text"], sentences[1].text)
        self.assertEqual(parsed[0]["sentences"][2]["text"], sentences[2].text)
