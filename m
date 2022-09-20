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
	docker compose up worker
