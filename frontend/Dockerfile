FROM node:18-alpine as base

FROM base as frontend
ENV PUID=1000
ENV PGID=1000

WORKDIR /usr/app/frontend
CMD npm install

