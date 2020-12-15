import argparse
import collections
import csv
import json
import glob
import math
import os
import pandas as pd
import re
import string
import sys
import time
import xml
import heapq


class Directory():
    def __init__(self, csv_file):
        self.csv_file = csv_file
        pass

    def get_data(self, filters):
        df = pd.read_csv(self.csv_file)
        df = df.drop(['Unnamed: 0', 'Keywords'], axis=1)
        for i, r in df.iterrows():
            if r['Number of Ratings'] == 0:
                df.loc[i, 'Rating'] = 'N/A'
        df = df.drop(['Number of Ratings'], axis=1)

        res = pd.DataFrame()
        if filters != '':
            for filter in filters:
                res = res.append(df.loc[df[filter[0]] == filter[1]])
        else:
            res = df

        res = res.drop_duplicates()
        res = res.sort_values(by=['Name'])
        js = res.reset_index().to_json(orient='records')
        data = json.loads(js)
        print(res.name.unique())
        return res

if __name__ == '__main__':
    pd.set_option('display.max_columns', None)

    instance = Directory('../static/app/csv/blackbusinesses-gmapspull-with-category.csv')
    # filter = [('Category', 'Food'), ('Category', 'Hair Care'), ('Category', 'Shopping')]
    filter = ''
    instance.get_data(filter)
