FROM node:alpine

WORKDIR /api

COPY package*.json .

RUN npm install

COPY ./src .

COPY .env .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]