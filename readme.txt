1. Previo
  a) Obtener una dirección privada que tenga dinero para simplificar el trabajo
    i) Hacer funcionar el nodo y copiar una de esas direcciones
    ii) Pegarlas en Metamasks a través del menú de importación
    ii) Colocarlas como varialbe de ambiente en el servicio de compose donde está el nodo
    ii)   nodo:

    <<: *app
    tty: true
    stdin_open: true
    hostname: nodo
    environment:
      dapk: "8312700601314f76129d91130b5e9a29b3345a21129a5748b849da51a0934325"


#Hacer esto en una ventana del shell
2. Para hacer funcionar nodo
    a) Compilar node.js en el servicio app y luego hacerla correr para que compile también hardhat
       i) docker compose build app
       ii) docker compose run app
       iii) También puede hacer make app

    b) Compilar el servicio nodo y luego ejecutarlo en modo de servidor, no hacer run sino up
       i) docker compose build nodo
       ii) docker compose up nodo

#Hacer esto en otra ventanal de shell
3. Anotar una de las direcciones privadas de cuentas que sean mostradas en la pantalla

Attaching to cfweb3-nodo-1
cfweb3-nodo-1  | Started HTTP and WebSocket JSON-RPC server at http://0.0.0.0:8545/
cfweb3-nodo-1  | 
cfweb3-nodo-1  | Accounts
cfweb3-nodo-1  | ========
cfweb3-nodo-1  | 
cfweb3-nodo-1  | WARNING: These accounts, and their private keys, are publicly known.
cfweb3-nodo-1  | Any funds sent to them on Mainnet or any other live network WILL BE LOST.
cfweb3-nodo-1  | 
cfweb3-nodo-1  | Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
cfweb3-nodo-1  | Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
cfweb3-nodo-1  | 
cfweb3-nodo-1  | Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
cfweb3-nodo-1  | Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
cfweb3-nodo-1  | 
cfweb3-nodo-1  | Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
cfweb3-nodo-1  | Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
cfweb3-nodo-1  | 
cfweb3-nodo-1  | Account #3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000 ETH)
cfweb3-nodo-1  | Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6
cfweb3-nodo-1  | 
cfweb3-nodo-1  | Account #4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 (10000 ETH)
cfweb3-nodo-1  | Private Key: 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a
cfweb3-nodo-1  | 
cfweb3-nodo-1  | Account #5: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc (10000 ETH)
cfweb3-nodo-1  | Private Key: 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba
cfweb3-nodo-1  | 
cfweb3-nodo-1  | Account #6: 0x976EA74026E726554dB657fA54763abd0C3a0aa9 (10000 ETH)
cfweb3-nodo-1  | Private Key: 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e
cfweb3-nodo-1  | 
cfweb3-nodo-1  | Account #7: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 (10000 ETH)
cfweb3-nodo-1  | Private Key: 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356
cfweb3-nodo-1  | 
cfweb3-nodo-1  | Account #8: 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f (10000 ETH)

    ir al paso 1 y volver al paso 4 que sigue


4. Ajustar Metamask
    a) Para operar con el nodo desde el punto de vista de un cliente de nuestro frontend, debe haber una cuenta que sea la dueña de los contratos que sean implementados en ese nodo (deployed). Para ello debe importarse una de las cuentas de ese nodo y usarla para conectarse a la red (la red es la dirección del nodo desde el punto de vista de Metamask).
       i) Crear la red donde se encuentre el nodo local en modo servidor (paso 3). Esta dirección es http://127.0.0.1:8545
       ii) Ir a /etc/hosts del computador real y revisar que no haya mapeamientos raros, solo debe haber 0.0.0.0 localhost o
           127.0.0.1 localhost. No tengo una versión definitiva de si eso causa problemas o no.
       iii) Agregar una red en metamask indicando esa url y chainId=1337
       iv) Tomar la dirección privada sin los caracteres iniciales '0x' copiarla al clipboard e importarla en el Menú de Metmask que surge al pinchar el ícono de la cuenta activa que se encuentra arriba al lado derecho. 
       v) Seleccionar en conectado para cambiar la cuenta que está conectada por la nueva cuenta importada
       vi) Si todo saliese bien, debiese verse un saldo en ETH para esa cuenta y el nombre de la red localhost en la parte superior
       vii) Si algo saliera mal, verificar con docker ps que el servicio nodo esté realmente en modo server ofreciendo sericios en la direccion 0.0.0.0:8545 o 127.0.0.1:8545
       5af50e92842f   cfweb3-nodo       "docker-entrypoint.s…"   25 minutes ago   Up 24 minutes   0.0.0.0:8545->8545/tcp, :::8545->8545/tcp   cfweb3-nodo-1
         observar aquí que se hace un mapemaiento entre 0.0.0.0:845 que es una direcció al interior de la imagen creada según el Dockerfil que está en contract. Y el mapeamioento en compose.yml en el servicio nodo ports: "8545:8545" Si algo de esto fallara, entonces el nodo no sería acesible y la flecha -> no estaría entre dos direcciones.

       viii) Puede corregir esto creando una cuenta backend en contrat/hardhat.config.js o revisando que esté configurada para puntar para que quede así.
  networks: {
    backend: {
      url: "http://nodo:8545",
      chainId: 1337
    },
    localhost: {
      chainId: 1337
    },
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: "https://goerli.infura.io/v3/afd9719a56c3484fbabce83eef19b22c",
      accounts: [`0x${pk}`]
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/5707a1c75350408cb408cba40175e252",
      accounts: [`0x${pk}`],
    }
  },
  etherscan: {
   .
   .
   .

       ix)  Observar que la dirección de la red backend corresponde la red configurada del mismo nombre en compose.yml donde el servicio nodo está ofreciendo sus servicios.
       x) Observar que en vez de 0.0.0.0 se indica el nombre de un host, en este caso el nombre del host es nodo y se especifica en compose.yml para el servicio nodo.
  nodo:
    <<: *app
    tty: true
    stdin_open: true
    hostname: nodo
    environment:
      dapk: "8312700601314f76129d91130b5e9a29b3345a21129a5748b849da51a0934325"
    ports:
      - "8545:8545"
    command:
      - npx
      - hardhat
      - node
    networks:
      backend:
5. Una vez que el servicio nodo y Metamask estén funcionando y conectados entre sí, debe hacer la implementación de los contratos. Eesto se hace con los textos de los contratos ya compilados y accesibles al código fuente del frontend. Para conseguir esto:
    a) Debe hacer docker compose compile
    b) docker compose deploy
    Para el paso b, nodo debe estar en modo server, lo que se logra haciendo docker compose up nodo
    c) Si todo saliese bien, entonces se veria en la pantalla de nodo, los nombres de los contratos siendo implementados y las direcciones que se les ha asignado
    d) Revisar en los arhchivos Token.svelty y otros svelty que la direccioń de los contratos coinicdad con los que se ven en el pantalla de nodo
   
6. En este punto si todo ha salido bien, tendremos conectados a Metamask con nodo y los contrados implementados en nodo solo falta servir el frontend para ello:
   a) docker compose run frontend (no es up porque se requiere compilar) no estoy muy seguro en realidad

   b) Al compilar el frontend se informa de la dirección donde está sirviendo, hay dos direcciones, hacer click en la dirección de red.
   c) Esto nos mostrará una pantalla con un botón login. Al presional login Mematmask se activa para permitir el acceso des la cuenta conectada
   d) Si todo sale bien se podrá mintear un Token o contrado o lo que sea que se haya planificado para el contrado

   e) Si sale un mensaje Sold Out significa que la cuenta que se ha usado desde Metamask no es la dueña de los contratos
   f) También ocurre que no se produce ninguna respuesta y es porque no hay una buena programación de la interfaz.

 eth_estimateGas
cfweb3-nodo-1  |   Contract call:       TokenBat#mintToken
cfweb3-nodo-1  |   From:                0xf9f84a5b6889273890ef18c2694eed446320aec6
cfweb3-nodo-1  |   To:                  0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
cfweb3-nodo-1  |   Value:               0 ETH
cfweb3-nodo-1  | 
cfweb3-nodo-1  |   Error: VM Exception while processing transaction: reverted with reason string 'sale hasn't started'
cfweb3-nodo-1  |       at TokenBat.mintToken (contracts/TokenBat.sol:54)
cfweb3-nodo-1  |       at processTicksAndRejections (node:internal/process/task_queues:95:5)
cfweb3-nodo-1  |       at EthModule._estimateGasAction (/usr/app/contract/node_modules/hardhat/src/internal/hardhat-network/provider/modules/eth.ts:429:7)
cfweb3-nodo-1  |       at HardhatNetworkProvider._sendWithLogging (/usr/app/contract/node_modules/hardhat/src/internal/hardhat-network/provider/provider.ts:144:22)
cfweb3-nodo-1  |       at HardhatNetworkProvider.request (/usr/app/contract/node_modules/hardhat/src/internal/hardhat-network/provider/provider.ts:121:18)
cfweb3-nodo-1  |       at JsonRpcHandler._handleRequest (/usr/app/contract/node_modules/hardhat/src/internal/hardhat-network/jsonrpc/handler.ts:191:20)
cfweb3-nodo-1  |       at JsonRpcHandler._handleSingleRequest (/usr/app/contract/node_modules/hardhat/src/internal/hardhat-network/jsonrpc/handler.ts:152:17)
cfweb3-nodo-1  |       at Server.JsonRpcHandler.handleHttp (/usr/app/contract/node_modules/hardhat/src/internal/hardhat-network/jsonrpc/handler.ts:52:21)
cfweb3-nodo-1  | 


   g) Observar que el nodo nos permite saber cuál es el método que está siendo llamado. En este caso es el método mintToken del Contrato TokenBat. Ese código está en TokenBat.svelty que a su vez invoca al contrato TokenBat.sol. El último se debe encontrar como contrato compilado en la carpeta tio@megano:/media/tio/docker-data/cfweb3/frontend/src/TokenBat.sol$ ls
ContextMixin.dbg.json  ContextMixin.json  TokenBat.dbg.json  TokenBat.json
tio@megano:/media/tio/docker-data/cfweb3/frontend/src/TokenBat.sol$ 
   h) Observe que esta carpeta ha sido derivada desde un mapeo en los servicios de compilación en compose.yml. Línea:
      - ./frontend/src:/usr/app/contract/artifacts/contracts
     De esta forma, cuando el compilador de hardhat crea artifactos en la carpeta de artifacts, en realidad los está envíando a una de las carpetas del frontend donde pueda interatuar con el compilador de código fuente del frontend

  app: &app
    tty: true
    stdin_open: true
    build: ./contract
    environment:
      dapk: "8312700601314f76129d91130b5e9a29b3345a21129a5748b849da51a0934325"
      NODE_OPTIONS: "--openssl-legacy-provider"
      ETHERSCAN_API_KEY: "EDBKYENP4HQJ3B5QAKJXUMDK245521HN7J"
    volumes:
      - ./contract/:/usr/app/contract
      - ./root/.cache/hardhat-nodejs/compilers/linux-amd64:/root/.cache/hardhat-nodejs/compilers/linux-amd64/
      - contract_node_modules:/usr/app/contract/node_modules
      - ./contract/artifacts:/usr/app/contract/artifacts
      - ./root/.cache/hardhat-nodejs/compilers/:/root/.cache/hardhat-nodejs/compilers/
      - ./frontend/src:/usr/app/contract/artifacts/contracts

 

Notas finales.
    1 Errores frecuentes
      El servicio nodo no se ve desde metamask
      El script de deployment implementa pero solo a una red interna de hardat (no es accesible desde Metamask tampoco)
      El frontend indica sold out, porque la cuenta de Metmask no es la dueña de los contratos
      El frontend indica solud out porque no se ha implementado ningún contrato.
      Errores de la iterfaz, el conteo de los token minteados sube muy rápido        
      Error de nonce muy alto, se ve en la pantalla del nodo. Se debe a que el nodo se vuelve a poner en servicio con un bloque en zero, pero Metmask tiene una estadística de una cuenta con bloques superiores. La solucioń consiste en usar el menú avanzado de cuentas en Metmask para resetear la cuenta.

cfweb3-nodo-1  | eth_blockNumber
cfweb3-nodo-1  | eth_getTransactionCount
cfweb3-nodo-1  | eth_sendRawTransaction
cfweb3-nodo-1  | 
cfweb3-nodo-1  |   Nonce too high. Expected nonce to be 6 but got 9. Note that transactions can't be queued when automining.

 
