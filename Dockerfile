FROM node:20.11.1-alpine as base

EXPOSE 8080

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

# ENTRYPOINT [ "npm run build && npm run migration:run" ] 

CMD npm run start
