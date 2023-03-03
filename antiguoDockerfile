FROM node:18-alpine as base
ENV PUID=1000
ENV PGID=1000
#COPY . /usr/app/


FROM base as contract
ENV PUID=1000
ENV PGID=1000
WORKDIR /usr/app/contract
COPY ./contract/package.json /usr/app/contract/package.json

#RUN npm install --save-dev git
#UN npm install --save-dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' @nomiclabs/hardhat-ethers 'ethers@^5.0.0'
RUN npm install

RUN ls -all 
FROM base as frontend
ENV PUID=1000
ENV PGID=1000

WORKDIR /usr/app/frontend
RUN npm install

FROM base as worker
ENV PUID=1000
ENV PGID=1000

WORKDIR /usr/app
RUN npm install -g @cloudflare/wrangler
WORKDIR /usr/app/worker
