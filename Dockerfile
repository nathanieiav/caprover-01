# set the base image to build from 
FROM node:alpine AS builder

# set the working directory
WORKDIR /app

# copy package files
COPY package.json ./
COPY package-lock.json ./

# install dependencies
RUN npm install

RUN apk add curl

# copy everything to /app directory
COPY ./ ./

RUN npm run build

# nginx state for serving content
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

EXPOSE 80

# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
