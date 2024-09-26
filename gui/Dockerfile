FROM node:18-alpine
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install 
RUN npm install express path axios
RUN npm install -g nodemon
RUN npm install --save-dev nodemon

COPY . . 
EXPOSE 3001


CMD ["nodemon", "index.js"]
