# coding:utf-8
import urllib
import oauth2 as oauth

class Oauth():
    consumer_key = "en35U31mW3P9EAqZvR6KXkZ2h"
    consumer_secret = "JWoHyJU5KRnbeWjb17hVHAQsiPFgwGwvBkZSkRsARrApZqNEKd"
    request_token_url = 'https://twitter.com/oauth/request_token'
    access_token_url = 'https://twitter.com/oauth/access_token'
    authenticate_url = 'https://twitter.com/oauth/authorize'
    callback = 'http://127.0.0.1:5000/get_accesstoken'
    def __init__(self):
        return

    def getAccessToken(self,oauthToken,oauthVerifier):
        consumer = oauth.Consumer(key=self.consumer_key, secret=self.consumer_secret)
        token = oauth.Token(oauthToken, oauthVerifier)

        client = oauth.Client(consumer, token)
        resp, content = client.request("https://api.twitter.com/oauth/access_token",
                                   "POST", body="oauth_verifier={0}".format(oauthVerifier))
        return content

    def getOauthToken(self):
        consumer = oauth.Consumer(key=self.consumer_key, secret=self.consumer_secret)
        client = oauth.Client(consumer)

        resp, content = client.request(self.request_token_url+'?&oauth_callback={0}'.format(self.callback), "GET")
        self.oauth = dict(urllib.parse.parse_qsl(content))
        return self.authenticate_url + '/?oauth_token={0}'.format(self.oauth[b'oauth_token'].decode('utf-8'))
    