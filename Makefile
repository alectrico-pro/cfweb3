app:
	docker compose run app

nodo:
	docker compose up nodo

compile:
	docker compose run compile

deploy:
	docker compose run deploy


deploy_ticket_system:
	docker compose run deploy_ticket_system

deploy_send_ether:
	docker compose run deploy_send_ether


test:
	docker compose run test

goerli:
	docker compose run goerli

mainnet:
	docker compose run mainnet


.PHONY: frontend
frontend:
	docker compose run frontend
