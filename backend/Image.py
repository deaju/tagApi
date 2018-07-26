# -*- coding:utf-8 -*-
import json
import os
import sys
import numpy as np
import cv2

class Image:
    def compare(self,img,img2):
        hist1=cv2.calcHist([img], [0], None, [256], [0, 256])
        hist2=cv2.calcHist([img2], [0], None, [256], [0, 256])
        return cv2.compareHist(hist1, hist2, 0)