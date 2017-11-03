FROM debian:latest
#config
MAINTAINER adnls 
RUN mkdir ufiles
WORKDIR /ufiles
RUN mkdir usrc
RUN mkdir ubin
COPY /usrc /ufiles/usrc 
COPY /ubin /ufiles/ubin
#python-3.6.2
RUN apt update && apt -y upgrade
RUN apt -y install build-essential
RUN apt install -y libssl-dev zlib1g-dev libncurses5-dev libncursesw5-dev libreadline-dev libsqlite3-dev 
RUN apt install -y libgdbm-dev libdb5.3-dev libbz2-dev libexpat1-dev liblzma-dev tk-dev 
RUN tar xf /ufiles/ubin/Python-3.6.2.tar.xz
RUN cd Python-3.6.2 && ./configure --enable-optimizations && make -j 8 && make altinstall
RUN python3.6 -m pip install requests
RUN python3.6 -m pip install cherrypy
RUN python3.6 -m pip install pymysql
RUN python3.6 -m pip install pandas
RUN python3.6 -m pip install flask


