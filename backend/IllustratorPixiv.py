# coding:utf-8
import os
import sys
import json
import requests
import cv2
import numpy as np
from ImagePixiv import ImagePixiv
import datetime
from pixivpy3 import *

class IllustratorPixiv():
    def __init__(self,url):
        pixivId=os.environ["PIXIVID"]
        pixivPass=os.environ["PIXIVPASS"]
        self.aapi = AppPixivAPI()
        self.aapi.login(pixivId, pixivPass)
        self.userId = self.__getUserId(url)
        self.illusts = self.aapi.user_illusts(self.userId,type='illust',req_auth=True).illusts

    def getIllusts(self):
        return self.illusts
    def getAapi(self):
        return self.aapi

    def searchSimilarImage(self,sourceImg,sourceDate,dateRange):
        startDate = sourceDate- datetime.timedelta(days=dateRange)
        endDate = sourceDate + datetime.timedelta(days=dateRange)
        for illust in self.illusts:
            ip = ImagePixiv(self.aapi,illust)
            if ip.date >= startDate and ip.date <= endDate and self.__judgeSimular(ip,sourceImg):
                return ip.tags
            elif ip.date > endDate:
                break
        return []

    def __judgeSimular(self,pixivImage,twitterImage):
        return pixivImage.compare(pixivImage.getImage()[0],twitterImage) > 0.9
            
    def __getUserId(self,url):
        response=requests.get(url)
        url=response.url
        return int(url[url.find('id=')+3:])
    