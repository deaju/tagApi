# -*- coding:utf-8 -*-
import sys
sys.path.append('./backend')
from flask import Flask, jsonify, request, render_template, session
from requests_oauthlib import OAuth1Session
import json
import os
import urllib
from Oauth import Oauth
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import threading

#import MeCab

app = Flask(__name__, static_url_path='', static_folder='./viewer/dist')
app.config['JSON_AS_ASCII'] = False
app.secret_key = 'test'
CORS(app)
socketio = SocketIO(app)


oath_key_dict = {
    "consumer_key": "en35U31mW3P9EAqZvR6KXkZ2h",
    "consumer_secret": "JWoHyJU5KRnbeWjb17hVHAQsiPFgwGwvBkZSkRsARrApZqNEKd",
}
@app.route('/', methods=['GET'])
def getAngular():
    return app.send_static_file('index.html')

@app.route('/twitter/<tweetId>', methods=['GET'])
def getTweetID(tweetId):
    return 'Hello World!日本語'+tweetId

@app.route('/get_accesstoken', methods=['GET'])
def getAccessToken():
    oauthToken = request.args.get('oauth_token')
    oauthVerifier = request.args.get('oauth_verifier')
    if not oauthToken == None  and not oauthVerifier == None:
        oauth = Oauth()
        token = oauth.getAccessToken(oauthToken,oauthVerifier)
        print(token.decode('utf-8'))
        return render_template('oauth.html',token=token.decode('utf-8'))
    else:
        oauth = Oauth()
        return oauth.getOauthToken()

@app.route('/twitter/<user>/tweet/', methods=['POST'])
def getTweet(user):
    if request.headers['Content-Type'] != 'application/json':
        return app.jsonify(res='error'), 400
    else:
        oath_key_dict.update(request.json)
        page = request.args.get('page')
        count = request.args.get('count')
        sid = request.args.get('sid')
        print(sid)
        tweets = fav_tweets_get(page, oath_key_dict, count, user)
        #thread_1 = threading.Thread(target=sendTagInfo)
        #thread_1.start()
        socketio.emit('my response', {'data': 'got it!'},room=sid)
        return jsonify(tweets)

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

def create_oath_session(oath_key_dict):
    oath = OAuth1Session(
    oath_key_dict["consumer_key"],
    oath_key_dict["consumer_secret"],
    oath_key_dict["access_token"],
    oath_key_dict["access_token_secret"]
    )
    return oath

@app.route('/twitter/<user>', methods=['POST'])
def getProfile(user):
    if request.headers['Content-Type'] != 'application/json':
        return app.jsonify(res='error'), 400
    else:
        oath_key_dict.update(request.json)
        profile = getTweetProf(user, oath_key_dict)
        return jsonify(profile)

def getTweetProf(user, oath_key_dict):
    url = "https://api.twitter.com/1.1/users/show.json?"
    params = {
        "screen_name" : user,
        }
    oath = create_oath_session(oath_key_dict)
    responce = oath.get(url, params = params)
    if responce.status_code != 200:
        print("Error code: {0}".format(responce.status_code))
        return None
    tweets = json.loads(responce.text)
    return tweets

def sendTagInfo(tweets):
    for tweet in tweets:
        #imageTweet = ImageTweet(tweet)
        tags = [{'name':'test'}]#imageTweet.getTag(15)
        if len(tags) > 0:
            return jsonify(tags)
        else:
            return jsonify([{'name':''}])

@socketio.on('my event', namespace='/test')
def test_message(message):
    print('test2')
    emit('my response', {'data': 'got it!'})

@socketio.on('tweets', namespace='/test')
def getTweetSocket(user):
    name=user['name']
    oath_key_dict.update(user['json'])
    page = user['page']
    count = user['count']
    tweets = fav_tweets_get(page, oath_key_dict, count, name)
    #thread_1 = threading.Thread(target=sendTagInfo)
    #thread_1.start()
    emit('tweets', tweets)
    for tweet in tweets:
        tags = {'id':tweet['id'], 'tags':[{'name':'test'}]}
        emit('tag', tags)


@socketio.on('connect', namespace='/test')
def test_connect():
    emit('my response', {'data': 'Connected', 'sid': request.sid})
    

if __name__ == '__main__':
    socketio.run(app)