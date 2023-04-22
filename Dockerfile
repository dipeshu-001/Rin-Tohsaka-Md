FROM node:14-alpine

WORKDIR /Rin-Tohsaka

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]
