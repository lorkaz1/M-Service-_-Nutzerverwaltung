FROM node:18-alpine
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install 
RUN npm install express axios mongodb
RUN npm install -g nodemon
RUN npm install --save-dev nodemon

COPY . . 
EXPOSE 3007


CMD ["nodemon", "index.js"]
