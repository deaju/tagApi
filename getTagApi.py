# -*- coding:utf-8 -*-

from flask import Flask, jsonify, request
from requests_oauthlib import OAuth1Session
import json
import os
import sys
import urllib
#import MeCab
from ImageTweet import ImageTweet
from ImagePixiv import ImagePixiv
from IllustratorPixiv import IllustratorPixiv

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

oath_key_dict = {
    "consumer_key": "en35U31mW3P9EAqZvR6KXkZ2h",
    "consumer_secret": "JWoHyJU5KRnbeWjb17hVHAQsiPFgwGwvBkZSkRsARrApZqNEKd",
    "access_token": "868744152753647617-ei1ptGYVwJqgv2zy7f09fPVuFrsYbLY",
    "access_token_secret": "VHQQ1g1MDTUMRufrF2mojkxiig47qEc7ghcGj32fyMX1f"
}

def create_oath_session(oath_key_dict):
    oath = OAuth1Session(
    oath_key_dict["consumer_key"],
    oath_key_dict["consumer_secret"],
    oath_key_dict["access_token"],
    oath_key_dict["access_token_secret"]
    )
    return oath

@app.route('/twitter/<tweetId>', methods=['GET'])
def getTweetID(tweetId):
    return 'Hello World!日本語'+tweetId


@app.route('/twitter/<user>/like/<tweetNum>', methods=['GET'])
def getImageTagFromNum(user,tweetNum):
    tweets=fav_tweets_get(1,oath_key_dict,200,user)
    print(len(tweets))
    tweet=tweets[int(tweetNum)]
    imageTweet = ImageTweet(tweet)
    illustrator = IllustratorPixiv(imageTweet.getUrl())
    return jsonify(illustrator.searchSimilarImage(imageTweet.getImage(0),imageTweet.date,7))

def fav_tweets_get(page, oath_key_dict, count, user):
    url = "https://api.twitter.com/1.1/favorites/list.json?"
    params = {
        "screen_name" : user,
        "page": page,
        "count" : count,
        "include_entities" : 1     #ツイートのメタデータ取得。これしないと複数枚の画像に対応できない。
        }
    oath = create_oath_session(oath_key_dict)
    responce = oath.get(url, params = params)
    if responce.status_code != 200:
        print("Error code: {0}".format(responce.status_code))
        return None
    tweets = json.loads(responce.text)
    return tweets

@app.route('/tweet',methods=['POST'])
def getImageTagFromJson():
    tweet=request.json
    imageTweet = ImageTweet(tweet)
    illustrator = IllustratorPixiv(imageTweet.getUrl)
    return jsonify(illustrator.searchSimilarImage(imageTweet.getImage(0),imageTweet.date,7))

if __name__ == '__main__':
    app.run(debug=True)