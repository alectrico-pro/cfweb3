<script>

  import { ethers  } from "ethers";
  import { onMount } from "svelte";

  import Contract from "./Recarga.sol/Recarga.json";

  const ethereum = window.ethereum;

  let chainId, chain, provider, signer;

  //variables del contrato Recarga
  let contract, contractWithSigner;

  let CONTRACT_ID;
  let ALECTRICO_ETH;
  let maxTokens = 0;
  let currentMinted = 0;
  let ownedTokens = [];
  let recentlyMintedTokens = [];

  let fono = "";
  let account = null;
  let minted = false;
  let transferred = false;
  let loading = false;

  let server_url= "http://www.alectrico.d:5000";
  let redeemed = false;
  let withdrawed = false;

  let owner_account = null;
  let owner_logged_in = false;

  let sale_started = false;

  onMount(() => {
    chain = window.ethereum.networkVersion;
  });

  if (ethereum) {
    if (chainId === "1") {
      CONTRACT_ID= "0x5fbdb2315678afecb367f032d93f642f64180aa3";
      ALECTRICO_ETH= "0xf9f84a5b6889273890ef18C2694eEd446320aec6"
    };
    if ( chainId === "1337" || chainId == null) {
      CONTRACT_ID= "0x5fbdb2315678afecb367f032d93f642f64180aa3";
      ALECTRICO_ETH= "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    };


    provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ID, Contract.abi, provider);
    contractWithSigner = contract.connect(signer);
  }

      
  async function init() {
    if (!account && ethereum.selectedAddress) {
      account = ethereum.selectedAddress;
    }

  }

  async function login() {

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }};

    const request = {
            method: (options.method || "GET"),
            headers: (options.headers || {}),
            body: (options.body || undefined),
            mode: "no-cors",
            cache: "no-cache",
            credentials: "same-origin",
            redirect: "follow",
            referrer: "client", // no-referrer, *client
        };
    console.log( request );

    loading = true;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    account = accounts[0];

    console.log( request );

    const response = await fetch(server_url + "/get_suscriptor_ether.json?ether_account=" + account, request);
    loading = false;

    init();
   
  }


  async function transfer() {

     const tx = signer.sendTransaction({
       to: CONTRACT_ID,
       value: ethers.utils.parseEther("0.007")
     });

    loading = true;
    transferred = false;

    contractWithSigner.on("LogDepositReceived", ( from, event) => {
      console.log("LogDepositReceived");

        let transferEvent ={
            from: from,
            eventData: event,
        }
        console.log(JSON.stringify(transferEvent, null, 4));
  
        loading = false;
        transferred = true;
    });

  }

  async function subscribe() {
    const body = {
      create_user: {
        cookie: '',
         orden_json: '',
         pago_url: '',
         token_ws: fono,
         nombre: "",
         email: "#{fono}.alectrico.cl",
         fono: fono,
         comuna: "Providencia",
         descripcion: "",
         direccion: "",
         latitude: 0,
         longitude: 0,
         avisar: true,
       }
    };

    console.log(JSON.stringify(body));
   // await last_id.put("log:102", JSON.stringify(body), { expirationTtl: SEGUNDOS_DE_EXPIRACION })


    const options = {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }};
    
     const request = {
            method: (options.method || "GET"),
            headers: (options.headers || {}),
            body: (options.body || undefined),
            mode: "no-cors",
            cache: "no-cache",
            credentials: "same-origin",
            redirect: "follow",
            referrer: "client", // no-referrer, *client
        };
  console.log( request );
  const response = await fetch(server_url + "/create_suscriptor_ether.json?ether_account=" + account + "&fono=" + fono , request);

 // console.log("antes de ir al servidor");
  //  console.log( init);
  //await last_id.put("log:102", "antes de ir al servidor", { expirationTtl: SEGUNDOS_DE_EXPIRACION })
 // resultado = await fetch(server_url + "/create_suscriptor_ether", init);
  //resultado = await fetch(server_url + "/comercio/servicios.json", init);

 // console.log("despues de servidor");

  //await last_id.put("log:103", "despues del servidor", { expirationTtl: SEGUNDOS_DE_EXPIRACION })
 // console.log( resultado );
  //await last_id.put("log:103:resultado", JSON.stringify(resultado), { expirationTtl: SEGUNDOS_DE_EXPIRACION })


  }

</script>


<header>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:image:src" content="assets/images/index-meta.png">
  <meta property="og:image" content="assets/images/index-meta.png">
  <meta name="twitter:title" content="Electricista a Domicilio Providencia">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
  <link rel="shortcut icon" href="assets/images/locoalicate-96x155.png" type="image/x-icon">
  <meta name="description" content="Electricista a Domicilio Providencia">

  <title>Electricista a Domicilio Providencia</title>
  <link rel="stylesheet" href="assets/web/assets/mobirise-icons2/mobirise2.css">
  <link rel="stylesheet" href="assets/web/assets/mobirise-icons/mobirise-icons.css">
  <link rel="stylesheet" href="assets/tether/tether.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-grid.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-reboot.min.css">
  <link rel="stylesheet" href="assets/dropdown/css/style.css">
  <link rel="stylesheet" href="assets/animatecss/animate.css">
  <link rel="stylesheet" href="assets/socicon/css/styles.css">
  <link rel="stylesheet" href="assets/theme/css/style.css">
  <link rel="preload" as="style" href="assets/mobirise/css/mbr-additional.css"><link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css" type="text/css">

  <section class="menu menu2 cid-sewGNRqCZx" once="menu" id="menu2-2">

    <nav class="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
        <div class="container">
            <div class="navbar-brand">
                <span class="navbar-logo">
                    <a href="https://alectrico.cl">
                        <img src="assets/images/locoalicate-96x155.png" alt="Alectrico" style="height: 3rem;">
                    </a>
                </span>
                <span class="navbar-caption-wrap"><a class="navbar-caption text-white text-primary display-4" href="#top">ALECTRICO</a></span>
            </div>
        </div>
    </nav>
</section>

<section class="header1 cid-sewsPSgeos mbr-parallax-background" id="header1-1">





    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-11">
                <h1 class="mbr-section-title mbr-fonts-style mb-3 display-4"><strong><em>Electricistas a Domicilio </em></strong><br><strong><em>- en Providencia -</em></strong></h1>
                <h2 class="mbr-section-subtitle mbr-fonts-style mb-3 display-5">Misión: Ayudar a proteger la vida y la propiedad</h2>
  {#if  (chain === "1337")}
    <div class="warning">
      Conectado a la red local.
    </div>
  {/if}

  {#if  chain === "1"}
    <div class="warning">
      Conectado a la BlockChain.
    </div>
  {/if}

  {#if  chain == null}
    <div class="danger">
    </div>
  {/if}

  <br><br>
  {#if ethereum}
    {#if account}

      {#if loading}
      <a class="btn btn-primary-outline display-4" ><span class="mbri-clock mbr-iconfont mbr-iconfont-btn" style="font-size: 44px;"></span><br><br></a>
      {/if}
       <div class="btn btn-primary-outline display-4" >
        <form on:submit|preventDefault={subscribe}>
         <input class=" display-4 " style="font-size: 44px;"
           type="number"
           min= "9"
           placeholder="Su fono"
           bind:value={fono}
         />
         <br><br><br><br> 
         <button class="btn btn-primary display-4" type="submit">
<span class="mobi-mbri mobi-mbri-phone mbr-iconfont mbr-iconfont-btn" style="font-size: 144px;">
</span> Presione Aquí</button>
       </form>
      </div>
      <br><br><br><br>
       <div class="mbr-section-btn mt-3">
         <form on:submit|preventDefault={transfer}>
          <button class= "btn btn-primary display-4" type="submit">
<span class="mbri-cash mbr-iconfont mbr-iconfont-btn" style="font-size: 144px;">
</span> 0.007 ETHER </button>
         </form>
      </div>
      <br><br>
      <h2 class="mbr-section-subtitle mbr-fonts-style mb-3 display-5">
      👋 Hola, dónenos algo de ETHER para contactarle con un electricista para una Visita en Providencia. Esto no cubrirá los costos de la Visita. Eso debe acordarlo directamente con el Electricista como un tema entre privados.</h2>

    {:else}
      <div class="mbr-section-btn mt-3">
      <a class="btn btn-primary-outline display-4" on:click={login} ><span class="mbri-cart-add mbr-iconfont mbr-iconfont-btn" style="font-size: 44px;"></span><br><br></a></div>

     {/if}
  {:else}

      <div class="mbr-section-btn mt-3"><a class="btn btn-primary display-4" href="https://wa.me/56945644889"><span class="socicon socicon-whatsapp mbr-iconfont mbr-iconfont-btn"></span></a> <a class="btn btn-info display-4" href="tel:+56962000921"><span class="mobi-mbri mobi-mbri-phone mbr-iconfont mbr-iconfont-btn"></span></a> <a class="btn btn-primary-outline display-4" href="https://alectrico.cl/providencia"><span class="mbri-cart-add mbr-iconfont mbr-iconfont-btn" style="font-size: 44px;"></span><br><br></a></div>
                <h2 class="mbr-section-subtitle mbr-fonts-style mb-3 display-5">
                  Esta app acepta pagos en ETHER usando MetaMask. </h2>


  {/if}
            </div>
        </div>
    </div>
</section>


<section class="features24 cid-sex0CusJkd" id="features1-b">



    <div class="container-fluid">
        <div class="row">

            <div class="card col-12 col-md-6 col-lg-3">
                <div class="card-wrapper">
                    <div class="card-box align-center">
                        <div class="iconfont-wrapper">
                            <span class="mbr-iconfont mbri-idea"></span>
                        </div>
                        <h5 class="card-title mbr-fonts-style display-7"><strong>Instalación</strong></h5>
                        <p class="card-text mbr-fonts-style display-5">Aléctrica ofrece el servicio de instalación de luminarias y enchufes.</p>
                    </div>
                </div>
            </div>


           <div class="card col-12 col-md-6 col-lg-3">
                <div class="card-wrapper">
                    <div class="card-box align-center">
                        <div class="iconfont-wrapper">
                            <span class="mbr-iconfont mbri-setting3"></span>
                        </div>
                        <h5 class="card-title mbr-fonts-style display-7"><strong>Reparación</strong></h5>
                        <p class="card-text mbr-fonts-style display-5">Aléctrica atiende reparaciones de fallas por cortocircuito, disparos intempestivos por sobrecalentamiento y fallas a tierra capaces de activar diferenciales.</p>
                    </div>
                </div>
            </div>
            <div class="card col-12 col-md-6 col-lg-3">
                <div class="card-wrapper">
                    <div class="card-box align-center">
                        <div class="iconfont-wrapper">
                            <span class="mbr-iconfont mbri-setting"></span>
                        </div>
                        <h5 class="card-title mbr-fonts-style display-7"><strong>Ampliación</strong></h5>
                        <p class="card-text mbr-fonts-style display-5">Aléctrica puede atender modificaciones y ampliaciones de una instalación eléctrica existente realizando primeramente un estudio de la situación.</p>
                    </div>
                </div>
            </div>
            <div class="card col-12 col-md-6 col-lg-3">
                <div class="card-wrapper">
                    <div class="card-box align-center">
                        <div class="iconfont-wrapper">
                            <span class="mbr-iconfont mobi-mbri-sites mobi-mbri"></span>
                        </div>
                        <h5 class="card-title mbr-fonts-style display-7"><strong>Certificación</strong></h5>
                        <p class="card-text mbr-fonts-style display-5">Aléctrica certifica sus trabajos cuando sea necesario y también el de otras empresas luego que haya medido y verificado que cada detalle de la instalación cumpla la normativa eléctrica.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


</header>


<main>
</main>

<footer> 
  Hecho en Chile por alectrico ®.
  alectrico es marca registrada de la empresa alectrico Spa. 
  Todos los derechos reservados.
</footer>
