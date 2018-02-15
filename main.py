import os,sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

import cv2

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        img = cv2.imread("./Lenna.jpg")
        body = "Lenna W:{0} H:{1}".format(img.shape[1], img.shape[0]).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-type", "text/html; charset=utf-8")
        self.send_header("Content-length", len(body))
        self.end_headers()
        self.wfile.write(body)

port = int(sys.argv[1])
httpd = HTTPServer(("", port), MyHandler)
print("start")
httpd.serve_forever()
