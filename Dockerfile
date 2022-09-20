
FROM rustlang/rust:nightly as rust
RUN mkdir /usr/app
RUN mkdir /usr/app/worker
WORKDIR /usr/app/worker
COPY ./worker /usr/app/worker
RUN cargo install wrangler


FROM node:alpine as base

FROM base as contract
ENV PUID=1000
ENV PGID=1000
RUN mkdir /usr/app
RUN mkdir /usr/app/contract
COPY ./contract /usr/app/contract
WORKDIR /usr/app/contract
RUN npm install --save-dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' @nomiclabs/hardhat-ethers 'ethers@^5.0.0'

FROM base as frontend
ENV PUID=1000
ENV PGID=1000
RUN mkdir /usr/app
RUN mkdir /usr/app/frontend
COPY ./frontend /usr/app/frontend
WORKDIR /usr/app/frontend
RUN npm install

FROM base as worker
ENV PUID=1000
ENV PGID=1000
RUN mkdir /usr/app
RUN mkdir /usr/app/worker
COPY ./frontend /usr/app/worker
WORKDIR /usr/app/worker
RUN npm install

