
#esto pasa cuando intento hacer andar a nodo
#en el primer caso mostrado, sí funciona, porque hay un mapeo indicado por la flecah -> entre direcciones de docker internas y las externas a la imagen y que quedan disponibles para su uso en la dirección de localhosta.

#en el segundo caso mostrado, no funciona, pues solo se tiene la dirección interna sin el mapeamiento

#Se observa que los nombres revelan como fueron llamados 
#en el segundo caso se usó run y en el primero up.
#Se necestia entonces usar docker compose up nodo

CONTAINER ID   IMAGE           COMMAND                  CREATED          STATUS         PORTS                                       NAMES
ca1b80c1c212   contract-nodo   "docker-entrypoint.s…"   10 seconds ago   Up 8 seconds   0.0.0.0:8545->8545/tcp, :::8545->8545/tcp   contract-nodo-1
70b02c93e084   contract-nodo   "docker-entrypoint.s…"   2 minutes ago    Up 2 minutes   8545/tcp                                    contract_nodo_run_b00569d54df7

