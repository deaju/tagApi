# -*- coding:utf-8 -*-

from requests_oauthlib import OAuth1Session
import json
import os
import sys
import urllib
#import MeCab
from ImageTweet import ImageTweet
from ImagePixiv import ImagePixiv
from IllustratorPixiv import IllustratorPixiv

if sys.version_info >= (3, 0):
    import imp
    imp.reload(sys)
else:
    reload(sys)
    sys.setdefaultencoding('utf8')
sys.dont_write_bytecode = True

oath_key_dict = {
    "consumer_key": "en35U31mW3P9EAqZvR6KXkZ2h",
    "consumer_secret": "JWoHyJU5KRnbeWjb17hVHAQsiPFgwGwvBkZSkRsARrApZqNEKd",
    "access_token": "868744152753647617-ei1ptGYVwJqgv2zy7f09fPVuFrsYbLY",
    "access_token_secret": "VHQQ1g1MDTUMRufrF2mojkxiig47qEc7ghcGj32fyMX1f"
}

# print( json.dumps(tweets[0], indent=4, separators=(',', ': '), ensure_ascii=False))
save_path = os.path.abspath('./store_twitter')

image_number = 0  #画像の通し番号をつけるための変数。お好みで。
get_pages = 2      
count = 200         #count * get_pages　だけツイートをさかのぼってくれる。今回は2000ツイート。

def create_oath_session(oath_key_dict):
    oath = OAuth1Session(
    oath_key_dict["consumer_key"],
    oath_key_dict["consumer_secret"],
    oath_key_dict["access_token"],
    oath_key_dict["access_token_secret"]
    )
    return oath

def fav_tweets_get(page, oath_key_dict):
    url = "https://api.twitter.com/1.1/favorites/list.json?"
    params = {
        "screen_name" : "pit359",
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

def image_saver(tweets):
    global image_number 
    for tweet in tweets:
        try:
            image_list = tweet["extended_entities"]["media"]

            for image_dict in image_list:
                url = image_dict["media_url"]
                url_large = url + ":large"
                with open(save_path+ "/" + str(image_number) + "_" + os.path.basename(url), 'wb') as f:
                    img = urllib.request.urlopen(url_large, timeout = 5).read()
                    f.write(img)
                print("done!")
                image_number += 1

        except KeyError:
            print("KeyError:画像を含んでいないツイートです。")
        except:
            print("Unexpected error:", sys.exc_info()[0])
# ツイートのキャプションを取得する
def get_caption(tweet):
    tmp = tweet["text"]
    caption = ""
    tmp = (tmp.replace('\n','')).split(' ')
    for i in range(0,len(tmp) -1):
        caption = "{} {}".format( caption , tmp[i] ) 
    return caption

def perseCaption(caption):
    mecab = MeCab.Tagger ('-d /var/lib/mecab/dic/mecab-ipadic-neologd')
    mecab.parse('')
    node = mecab.parseToNode(caption)
    while node:
        word = node.surface
        wordClass = node.feature.split(",")[0]
        pos = node.feature.split(",")[1]
        print('{0} , {1} ,{2}'.format(word,wordClass, pos))
        node = node.next
def debug():
    tweets=fav_tweets_get(1,oath_key_dict)
    it=ImageTweet(tweets[19])
    ilp=IllustratorPixiv(it.getUrl())
    ilp.searchSimilarImage(it.getImage(0),it.date,7)
#if __name__ == "__main__":
#    for i in range(1, get_pages):
#        tweets = fav_tweets_get(i, oath_key_dict)
#        image_saver(tweets)
