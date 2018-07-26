# coding:utf-8
import os
import sys
import json
import requests
import cv2
import numpy as np
from pixivpy3 import *
from Image import Image
import datetime

class ImagePixiv(Image):
    def __init__(self,aapi,imageObject):
        self.aapi = aapi
        self.imageObject = imageObject
        self.date = self.__getDate(imageObject)
        self.tags = imageObject['tags']
    def getImage(self):
        if 'meta_single_page' in self.imageObject:
            illustUrl=self.imageObject['meta_single_page']['original_image_url']
            referer='https://app-api.pixiv.net/'
            response=self.aapi.requests_call('GET', illustUrl,
                headers={ 'Referer': referer }, stream=True)
            image=np.asarray(bytearray(response.raw.read()), dtype="uint8")
            return [cv2.imdecode(image, cv2.IMREAD_COLOR)]
        else:
            return []
    def __getUserId(self,url):
        response=requests.get(url)
        url=response.url
        return int(url[url.find('id=')+3:])
    
    def __getDate(self,imageObject):
        return datetime.datetime.strptime(imageObject['create_date'],'%Y-%m-%dT%X+09:00')
