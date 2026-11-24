FROM node:24-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_GRAPHQL_HTTP=/graphql
ARG VITE_GRAPHQL_WS=
ENV VITE_GRAPHQL_HTTP=$VITE_GRAPHQL_HTTP
ENV VITE_GRAPHQL_WS=$VITE_GRAPHQL_WS

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
