"""
Definition of views.
"""

from datetime import datetime
from django.shortcuts import render
from django.http import HttpRequest
import pandas as pd
import json

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/index.html',
        {
            'title':'Home Page',
            'year':datetime.now().year,
        }
    )

def contact(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/contact.html',
        {
            'title':'Contact',
            'message':'Your contact page.',
            'year':datetime.now().year,
        }
    )

def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/about.html',
        {
            'title':'Our Story',
            'message':'Description',
            'year':datetime.now().year,
        }
    )

def directory(request):
    """Renders the directory page."""
    assert isinstance(request, HttpRequest)

    directory = Directory('PBB/static/app/csv/blackbusinesses-gmapspull-with-category.csv')
    # filter = [('Category', 'Food'), ('Category', 'Hair Care'), ('Category', 'Shopping')]
    filter = ''
    df = directory.get_data(filter)

    js = df.reset_index().to_json(orient='records')
    data = json.loads(js)

    return render(
        request,
        'pbb/directory.html',
        {
            'title':'Directory',
            'message':'Directory stuff',
            'year':datetime.now().year,
            'data': data
        }
    )

def dashboard(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/dashboard.html',
        {
            'title':'Dashboard',
            'message':'Dashboard stuff',
            'year':datetime.now().year,
        }
    )

def submitreview(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/submitreview.html',
        {
            'title':'Submit A Review',
            'message':'Submit A Review stuff',
            'year':datetime.now().year,
        }
    )

class Directory():
    def __init__(self, csv_file):
        self.csv_file = csv_file
        pass

    def get_data(self, filters):
        df = pd.read_csv(self.csv_file)
        df = df.drop(['Unnamed: 0', 'Keywords'], axis=1)
        # for i, r in df.iterrows():
        #     if r['Number of Ratings'] == 0:
        #         df.loc[i, 'Rating'] = 'N/A'
        df = df.drop(['Number of Ratings'], axis=1)

        res = pd.DataFrame()
        if filters != '':
            for filter in filters:
                res = res.append(df.loc[df[filter[0]] == filter[1]])
        else:
            res = df

        res = res.drop_duplicates()
        res = res.sort_values(by=['Name'])
        return res
