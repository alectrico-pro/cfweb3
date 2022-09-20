#FROM rustlang/rust:nightly as rust 
#RUN cargo install wrangler

# Specify a base image
FROM node:alpine as base

#Install some dependencies

WORKDIR /usr/app
COPY ./ /usr/app

FROM base as frontend
ENV PUID=1000
ENV PGID=1000
WORKDIR /usr/app/frontend
RUN npm install

FROM base as contract
ENV PUID=1000
ENV PGID=1000
WORKDIR /usr/app/contract
RUN npm install --save-dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' @nomiclabs/hardhat-ethers 'ethers@^5.0.0'

FROM base as worker
ENV PUID=1000
ENV PGID=1000
WORKDIR /usr/app/worker
RUN npm install




# Set up a default command
#CMD [ "npm","start" ]
