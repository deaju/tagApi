FROM heroku/heroku:16

RUN apt-get update && apt-get install -y \
    python3-pip \
    libsm6

RUN pip3 install --upgrade pip
RUN pip3 install opencv-python
RUN pip3 install requests_oauthlib
RUN pip3 install pixivpy
RUN pip3 install flask
RUN pip3 install gunicorn
RUN pip3 install oauth2


RUN mkdir -p /opt
ADD ./backend /opt
ADD ./viewer/dist /opt
ADD ./getTagApi.py /opt
WORKDIR /opt

CMD gunicorn getTagApi:app --log-file=-

