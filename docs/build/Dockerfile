FROM node:18-alpine3.15 as base

WORKDIR /usr/app
COPY ./ /usr/app

FROM base as frontend
WORKDIR /usr/app/frontend
COPY ./build.sh /usr/app/frontend
RUN chmod +x /usr/app/frontend/build.sh
RUN npm install

FROM base as contract
WORKDIR /usr/app/contract
RUN npm install --save-dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' @nomiclabs/hardhat-ethers 'ethers@^5.0.0'

#Permite conectarse a la blockchain Ethereum
#https://docs.ethers.io/v5/getting-started/
FROM base as ethers
WORKDIR /usr/app/contract
RUN npm install --save-dev ethers


FROM base as worker
WORKDIR /usr/app/worker
RUN npm install -g wrangler


FROM base as openzeppelin
WORKDIR /usr/app/openzeppelin
RUN npm install @openzeppelin/contracts
# Set up a default command
CMD [ "npm","run" ]
                            
