fund:
	docker compose up fund
d:	
	docker compose up d

deploy:
	docker compose up deploy

node:
	docker compose up node

.PHONY: frontend
frontend:
	docker compose up frontend

compile:
	docker compose up compile

console:
	docker compose up console

test:
	docker compose up test

build:
	docker compose build 

up:
	docker compose up

.PHONY: worker
worker:
	docker run -v $(shel pwd)/worker/build:/usr/app/worker/build cfweb3_npm npm run build	
	docker run  -e PUID=1000 -e PGID=1000 -p 8787:8787 cfweb3_rust wrangler dev

npm:
	docker compose up npm

worker-build:
	docker compose up worker-build
