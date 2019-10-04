FROM node:10.16.3-alpine AS node_builder

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY public ./public
COPY src ./src
COPY tsconfig.json .
COPY yarn.lock .

RUN yarn && yarn build
