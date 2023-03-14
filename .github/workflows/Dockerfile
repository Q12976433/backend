From ubuntu
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get insall apache2 -y
RUN apt-get install apache2-utils -y
RUN apt-get clean
EXPOSE  80
CMD [ "apache2ctl","-D","FORCEGROUND" ]