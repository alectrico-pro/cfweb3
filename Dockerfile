#FROM rustlang/rust:nightly as rust 
#RUN cargo install wrangler

# Specify a base image
FROM node:alpine as base

#Install some dependencies

WORKDIR /usr/app
COPY ./ /usr/app

FROM base as frontend
WORKDIR /usr/app/frontend
RUN npm install

FROM base as contract
WORKDIR /usr/app/contract
RUN npm install

# Set up a default command
#CMD [ "npm","start" ]
