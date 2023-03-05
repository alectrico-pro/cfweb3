app:
	docker compose run app

nodo:
	docker compose up nodo

compile:
	docker compose run compile


deploy:	
	docker compose run deploy_token_bat


test:
	docker compose run test

goerli:
	docker compose run goerli

mainnet:
	docker compose run mainnet


.PHONY: frontend
frontend:
	docker compose run frontend
