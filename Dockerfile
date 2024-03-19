FROM node:20.11.1-alpine as base

EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD npm run start
