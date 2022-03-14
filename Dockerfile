FROM nginx:1.21.1

LABEL org.reddwarf.image.authors="jiangtingqiang@gmail.com"

ENV LANG=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8 \
    TZ=Asia/Shanghai

ADD dist /usr/share/nginx/html/
COPY default.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

# docker build -f ./Dockerfile -t="reddwarf-pro/react-admin:v.1.0.0" .
