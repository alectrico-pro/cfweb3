app:
	docker compose run app

nodo:
	docker compose up nodo

compile:
	docker compose run compile


token_bat:	
	docker compose run deploy_token_bat

zombie_electrico:
	docker compose run deploy_zombie_electrico

zombie_factory:
	docker compose run deploy_zombie_factory

battery_factory:
	docker compose run deploy_battery_factory


ronda_factory:
	docker compose run deploy_ronda_factory

cfnft:
	docker compose run deploy_cfnft

ticket:
	docker compose run deploy_ticket_system


test:
	docker compose run test

goerli:
	docker compose run goerli

mainnet:
	docker compose run mainnet


.PHONY: frontend
frontend:
	docker compose run frontend
