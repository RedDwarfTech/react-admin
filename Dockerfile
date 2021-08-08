FROM node:alpine

LABEL org.reddwarf.image.authors="jiangtingqiang@gmail.com"

WORKDIR /root/dist/

RUN mkdir -p /root/dist

# add `/app/node_modules/.bin` to $PATH
ENV PATH /root/dist/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

ADD . ./

EXPOSE 80

ENTRYPOINT exec npm start


# docker build -f ./Dockerfile -t="reddwarf-pro/react-admin:v.1.0.0" .
