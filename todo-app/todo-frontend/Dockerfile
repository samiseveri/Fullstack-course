FROM node:24-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_BACKEND_URL=/api
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
