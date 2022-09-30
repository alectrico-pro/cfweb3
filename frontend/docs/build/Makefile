rebuild:
	docker run -v $(shell pwd)/frontend/public/:/public cfweb3_frontend npm rebuild && cp * ./frontend/public/build
	
# && npm run dev --host


#contratos activa un servidor rpc-json que
#es un "ganache local", una especie de simulador
#de una blockchain
#también activa un frontend escrito en node con svelty
#El frontend necesita la extensión NetMasks en el browser
#
#
#Como creo que funciona en 09 de septiembre de 2022
#Al mostrar la interfaz en http://172.18.0.3:5000
#Se muestra un botón de login
#Al presionar el botón, se interactúa con MetaMask
#El cual tiene registraoda una que he llamado ganache
#0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
#Esa cuenta es una de las tantas que han sido creadas en la blockchain local
#En  Started HTTP and WebSocket JSON-RPC server at http://0.0.0.0:8545/
#Hay cuentas ya creadas, pero la que están en Metamask no se exhibe aquí.
#Por otro lado, Metamask en este punto usa la red en 8545 y supuestamente ya estaría logada en el ganache
#Accounts
#cfweb3-contract-1      | ========
#cfweb3-contract-1      | Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #2: 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #3: 0x90f79bf6eb2c4f870365e785982e1f101e93b906 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #4: 0x15d34aaf54267db7d7c367839aaf71a00a2c6a65 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #5: 0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #6: 0x976ea74026e726554db657fa54763abd0c3a0aa9 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #7: 0x14dc79964da2c08b23698b3d3cc7ca32193d9955 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #8: 0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f (10000 ETH)
#cfweb3-contract-1      | Private Key: 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #9: 0xa0ee7a142d267c1f36714e4a8f75612f20a79720 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #10: 0xbcd4042de499d14e55001ccbb24a551f3b954096 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #11: 0x71be63f3384f5fb98995898a86b02fb2426c5788 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #12: 0xfabb0ac9d68b0b445fb7357272ff202c5651694a (10000 ETH)
#cfweb3-contract-1      | Private Key: 0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #13: 0x1cbd3b2770909d4e10f157cabc84c7264073c9ec (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #14: 0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #15: 0xcd3b766ccdd6ae721141f452c550ca635964ce71 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #16: 0x2546bcd3c84621e976d8185a91a922ae77ecec30 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #17: 0xbda5747bfd65f08deb54cb465eb87d40e51b197e (10000 ETH)
#cfweb3-contract-1      | Private Key: 0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #18: 0xdd2fd4581271e230360230f9337d5c0430bf44c0 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0
#cfweb3-contract-1      | 
#cfweb3-contract-1      | Account #19: 0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199 (10000 ETH)
#cfweb3-contract-1      | Private Key: 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e
#parece que la interface hace peguntas al ganache buscando el estado que necesita para operar el caso de
#uso que nos ocupa
#Hay eth_blockNumber (10)
#eth_blockNumber (11)
#Parece que se mineran unos pocos bloques
#Luego se pregunta por el balance
#eth_getBalance (2)
#eth_blockNumber (3)
#Y están los logs
#eth_blockLogs
#eth_getLogs
#eth_getBlockByNumber
#Es todo por ahora.
#----
#Estos son otros reportes
#net_version
#eth_gasPrice
#Despues que hace login
#Y cuando refresco:
#Hay más avisos
#eth_accounts
#Este s interesante
#eth_call
# WARNING: Calling an account which is not a contract
#  From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
#  To:   0x5fbdb2315678afecb367f032d93f642f64180aa3


#Es interesante que from es la cuenta que he llamado ganache en Metamask
#0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

#Y 0x5fbdb2315678afecb367f032d93f642f64180aa3
# const CONTRACT_ID = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
# Es el contracto para acuñar tokens CFNFT, que es justamente el caso de uso que se implementa


#Si observamos el despliegue de la página de frontend y el console del browser
#Se nota que se reportan todos lso tokens como ya creados, son 2048. Es extraño
#Pues no he hecho tal cosa
#Pero en esas condiciones el contrato no dejará acuñar otro token
#Así que el botón para hacer Mint, solo informa que no hay más tokens


#use make contratos para tener un frontend interactuando con un ganache local
#Debe usarse Metamask para acceder al ganache
#Si se cambia el código en App.svelte hay que llamar a make src


contratos:
	docker compose --profile contratos up

src:
	docker compose build frontend

run:
	docker compose run contract

ethers:
	docker compose up ethers

coin_sale:
	docker compose up coin_sale

test: 
	docker compose up test

deploy:
	docker compose up deploy

build:
	docker compose build 

up:
	docker compose up


