

app:
	docker compose run app

compile:
	docker compose run compile

nodo:
	docker compose run nodo


ganache:
	docker run contract-node -v $(pwd):/usr/app/contract -t ganache ls

deploy:
	docker exec contract-nodo-1 npx hardhat run scripts/deploy.js --network localhost --verbose

