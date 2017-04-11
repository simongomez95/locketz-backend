# Build and run docker with your example
#  docker build -t instabot .
#  docker run --name instabot -p 80:80 -i -t instabot python examples/like_example.py

FROM node:latest
RUN npm install sails -g
RUN npm install -g grunt-cli
ADD . /app
WORKDIR /app
RUN npm install
