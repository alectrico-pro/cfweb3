b:
	docker run --rm -ti  -e PUID=1000   \
	       	-e PGID=1000 -e USER=1000   \
		-p 8976:8976                \
		-v $(shell pwd)/:/usr/app/  \
		-v $(shell pwd)/:/root/     \
		mico wrangler whoami


