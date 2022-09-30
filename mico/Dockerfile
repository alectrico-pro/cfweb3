#wrangler para un proyecto listo
FROM node:alpine as base
ENV PUID=1000
ENV PGID=1000
ENV USER=1000

COPY . /usr/home
WORKDIR /usr/home
RUN npm i -g @cloudflare/wrangler
RUN wrangler build 
