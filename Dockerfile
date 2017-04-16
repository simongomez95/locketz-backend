FROM node:latest
RUN npm install sails -g
RUN npm install -g grunt-cli
RUN npm install -g nodemon
ADD . /app
WORKDIR /app
RUN npm install
