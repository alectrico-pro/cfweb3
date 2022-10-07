token_verify:
	curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
     -H "Authorization: Bearer yCSRvAkw9H00b45YILwXHGdgfSUlT1fabqGWFDgD" \
     -H "Content-Type:application/json"

fund:
	docker compose up fund

d:	
	docker compose up d

deploy:
	docker compose up deploy

rinkeby:
	docker compose up rinkeby

goerli:
	docker compose up goerli



mainnet:
	echo "esto costará ETH"
	docker compose up mainnet


rdeploy:
	docker compose up rdeploy




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
preview:
	docker compose up worker-preview

dev:
	docker compose up worker-dev

worker-console:
	docker compose up worker-console

#para ingresar el token api
worker-config: 
	#ocker compose run \
        #	-v $(shell pwd)/worker:/usr/app/worker \
	#      	-v $(shell pwd)/worker/.wrangler/config/:/root/.wrangler/config/ \
        #		worker wrangler config && \
	#
worker:
	docker compose run \
                -v $(shell pwd)/worker:/usr/app/worker \
                -v $(shell pwd)/worker/.wrangler/config/:/root/.wrangler/config/ \
		worker wrangler publish 
