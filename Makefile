app:
	docker compose run app

nodo:
	docker compose up nodo

compile:
	docker compose run compile

deploy:
	docker compose run deploy

.PHONY: frontend
frontend:
	docker compose run frontend
