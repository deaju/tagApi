M heroku/heroku:16

ADD . /opt
WORKDIR /opt

RUN apt-get update && apt-get install -y \
    python3-pip \
    libsm6

RUN pip3 install opencv-python

RUN useradd -m myuser
USER myuser

CMD python3 main.py $PORT

