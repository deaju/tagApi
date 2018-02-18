# -*- coding:utf-8 -*-

from requests_oauthlib import OAuth1Session
from Image import Image
import json
import os
import sys
import urllib
import MeCab
import numpy as np
import cv2
import datetime

class ImageTweet(Image):
    def __init__(self,tweet):
        self.pixivUrl=self.__getPixivUrl(tweet)
        self.caption=self.__getCaption(tweet)
        self.tag = self.__getTag(self.caption)
        self.mediaUrl = self.__getMediaImage(tweet)
        self.date = self.__getDate(tweet)

    def getTag(self):
        return self.tag
    def getCaption(self):
        return self.caption
    def getUrl(self):
        return self.pixivUrl
    def getMediaUrl(self):
        return self.mediaUrl
    def downloadImage(self,num,filename):
        path=os.path.abspath('./')
        with open(path+filename, 'wb') as f:
            img = urllib.request.urlopen(self.mediaUrl[num], timeout = 5).read()
            f.write(img)
            
    def getImage(self,num):
        illustUrl = self.mediaUrl[num]
        response=urllib.request.urlopen(illustUrl)
        image=np.asarray(bytearray(response.read()), dtype="uint8")
        return cv2.imdecode(image, cv2.IMREAD_COLOR)

    def __getMediaImage(self,tweet):
        urls=[]
        if "extended_entities" in tweet:
            image_list = tweet["extended_entities"]["media"]
            for image_dict in image_list:
                url = image_dict["media_url"]
                urls.append(url)
        return urls
    
    def __getTag(self,caption):
        tag=[]
        mecab = MeCab.Tagger ('-d /var/lib/mecab/dic/mecab-ipadic-neologd')
        mecab.parse('')
        node = mecab.parseToNode(caption)
        while node:
            word = node.surface
            if node.feature.split(',')[1]==u"固有名詞":
                tag.append(word)
            node = node.next
        return tag
        

    def __getCaption(self,tweet):
        tmp = tweet["text"]
        caption = ""
        tmp = (tmp.replace('\n','')).split(' ')
        for i in range(0,len(tmp) -1):
            caption = "{} {}".format( caption , tmp[i] ) 
        return caption

    def __getPixivUrl(self,tweet):
        entities=tweet['user']['entities']
        url = self.__searchPixivUrl(entities,'url')
        if len(url) > 0 :
            return url
        else:
            url=self.__searchPixivUrl(entities,'description')
            return url if len(url)>0 else ''

    def __searchPixivUrl(self,entities,keys):
        urls=entities[keys]['urls']
        if len(urls) <= 0:
            return ''
        for i in range(0,len(urls)):
            url=urls[i]
            if 'expanded_url' in url and url['expanded_url'].find('pixiv') >0:
                return url['expanded_url']
        return ''
    def __getDate(self,tweet):
        return datetime.datetime.strptime(tweet['created_at'], '%a %b %d %X +0000 %Y')

