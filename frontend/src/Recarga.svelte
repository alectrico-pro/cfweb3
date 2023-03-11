<script>

  import { ethers } from "ethers";
  import { onMount } from "svelte";


  import Contract from "./BatteryFactory.sol/BatteryFactory.json";

  const ethereum = window.ethereum;

  let chainId = ethereum.networkVersion

  let chain, provider, signer;

  //variables del contrato BatteryFactoryt
  let contract, contractWithSigner;

  let CONTRACT_ID;
  let ALECTRICO_ETH;
  let maxTokens = 0;
  let currentMinted = 0;
  let ownedTokens = [];
  let recentlyMintedTokens = [];

  let account = null;
  let minted = false;
  let transferred = false;
  let loading = false;

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
      CONTRACT_ID= "0xC3D2351f4a2e14cbf86Ab816B1e39dfEB61EC8C6"
      ALECTRICO_ETH="alectrico.eth"

    };
    if ( chainId === "1337" || chainId == null) {
      CONTRACT_ID = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      //Cualquier cuenta de esta blockchain
      ALECTRICO_ETH="0x932ad06209193e5151dC0E869518a13187e332d4"

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

    if (account) {
      findCurrentMinted();
    } else {
      fetchRecentlyMinted();
    }
  }

  async function login() {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    account = accounts[0];
    init();
  }

  async function mint() {

    await contractWithSigner.crearRandomBat( "MickyBat", {value: "7000000000000000"});
    redeemed = false;
    loading = true;

    contractWithSigner.on("NewBat", (from, to, name, transaccion, event) => {
     console.log("NewBat");
      loading = false;
    });
  }


  async function transfer() {
     const tx = signer.sendTransaction({
       to: CONTRACT_ID,
      value: ethers.utils.parseEther("0.007")
     });

    contractWithSigner.on("LogDepositReceived", ( from, event) => {
      console.log("LogDepositReceived");

        let transferEvent ={
            from: from,
            eventData: event,
        }
        console.log(JSON.stringify(transferEvent, null, 4))

      loading = false;
    });

    let lastTransfertEvent = await contract.queryFilter({
      topics: [
       "0x15382559391789f1865e10e9c8b51327a9cb0381eae89973ada229e7a78c08f3",
      ],
    });

    await lastTransfertEvent.map(async (TransferEvent) => {
      console.log( "En lastTransferEvent" );
      console.log( TransferEvent );
    });

    transferred = false;
    loading = true;
  }

  async function transfer_me() {
     const tx = signer.sendTransaction({
       to: ALECTRICO_ETH,
      value: ethers.utils.parseEther("0.000001")
     });

    contractWithSigner.on("LogDepositReceived", (sender, transaccion) => {
      console.log("LogDepositReceived");
      console.log(sender);
      console.log(transaccion);
      loading = false;
    });

    transferred = false;
    loading = true;
  }



  async function withdraw() {
    await contractWithSigner.withdrawBalance();
    withdrawed= false;
    loading = true;

    contractWithSigner.on("Withdrawed", (from, to, balance, transaccion, event) => {
      console.log("Withdrawed");
      console.log("Amount withdrawed from the contract:");
      console.log(0.000000000000000001 * Number(transaccion.args.amount));
      console.log("Current Contract's balance:");
      console.log(0.000000000000000001 * Number(transaccion.args.balance));

      console.log("Current Owner's Account balance:");
      console.log(0.000000000000000001 * Number(transaccion.args.owner_current_balance));

      redeemed = false;
      loading = false;
    });
  }

  async function start_sale() {
    await contractWithSigner.startSale();
    sale_started = false;
    loading = true;

    contractWithSigner.on("SaleStarted", (from, to, transaccion, event) => {
      sale_started = true;
      loading = false;
      cosole.log("Sale Started");
    });
  }



  async function redeem(token_id) {
    const id= "token_"+token_id;
    const elemento = document.getElementById(id);
    elemento.replaceWith("");
    await contractWithSigner.redeemToken(token_id);
    minted = false;
    loading = true;

    contractWithSigner.on("Redeemed", (from, to, amount, event) => {
      loading = false;
      currentMinted -= 1;
      ownedTokens = ownedTokens;
      redeemed = true;
    });
  }


  async function updateCurrentOwned() {
    ownedTokens = [];
    const numberOfTokensOwned = await contract.balanceOf(account);
    for (let i = 0; i < Number(numberOfTokensOwned); i++) {
      const token    = await contract.tokenOfOwnerByIndex(account, i);
      const URI      = await contract.tokenURI(token);
      const response = await fetch(URI);
      const result   = await response.json();
      result.id      = token;
      ownedTokens.push(result);
    }
    currentMinted = ownedTokens.length;
    ownedTokens = ownedTokens;
  }



  async function findCurrentMinted() {
    const supply = await provider.getBalance(account) / 1000000000000000000;
    currentMinted = await contract.cuantasBateriasHay();
    
    console.log(currentMinted);

  }

  // tpic original NO BORRAR -"0xb9203d657e9c0ec8274c818292ab0f58b04e1970050716891770eb1bab5d655e",

  async function fetchRecentlyMinted() {
    let recentMintEvents = await contract.queryFilter({
      topics: [
       "0xb9203d657e9c0ec8274c818292ab0f58b04e1970050716891770eb1bab5d655e",
      ],
    });

    recentMintEvents = recentMintEvents.slice(-3);

    await recentMintEvents.map(async (MintEvent) => {
      console.log( "En recentMintEvents" );
      const token = MintEvent.args.tokenId;
      const URI = await contract.tokenURI(token);
      const response = await fetch(URI);

      const result = await response.json();
      result.id = token;

      recentlyMintedTokens.push(result);
      recentlyMintedTokens = recentlyMintedTokens;
    });
  }


  async function fetchLastMinted() {
    let lastMintEvent = await contract.queryFilter({
      topics: [
       "0xb9203d657e9c0ec8274c818292ab0f58b04e1970050716891770eb1bab5d655e",
      ],
    });

    lastMintEvent = lastMintEvent.slice(-1);

    await lastMintEvent.map(async (MintEvent) => {
      console.log( "En lastMintEvent" );
      const token = MintEvent.args.tokenId;

      if ( ! document.getElementById( token ) ) {
        const URI = await contract.tokenURI(token);
        const response = await fetch(URI);
        const result = await response.json();
        result.id = token;
        ownedTokens.push(result);
        ownedTokens = ownedTokens;
      }
    });
  }

</script>


<header>
  <a href="/">Cloudflare Web3</a>
  <ul>
    <li>
      <a href="https://testnets.opensea.io/collection/cfnft">View on OpenSea</a>
    </li>
    <li><a href="https://github.com/signalnerve/cfweb3">GitHub</a></li>
  </ul>
</header>
  {#if  chain === "1337"}
    <div class="warning">
      This marketplace is connected to the Local test network.
    </div>
  {/if}

  {#if  chain === "1"}
    <div class="warning">
      This marketplace is connected to Mainnet.
    </div>
  {/if}

  {#if  chain == null}
    <div class="danger">
      We don't now what is the network.
    </div>
  {/if}



<main>
  {#if ethereum}
    {#if account}
      <h1>👋 Welcome to the Cloudflare Web3 app</h1>
      <h2>You are currently logged in as {account.slice(0, 5)}</h2>
      {#if sale_started} <h3> Sale Started </h3> {/if}
      {#if loading}
        <p>Transaction processing...</p>
      {/if}
      {#if minted}
        <p>
          You minted an NFT! If you haven't already, add a new asset to Metamask
          using the below info
        </p>
        <ul>
          <li>Contract address: {CONTRACT_ID}</li>
          <li>Token symbol: TokenBat</li>
          <li>Token decimal: 0</li>
        </ul>
      {/if}
      {#if redeemed}
        <p>
          You redeemed an NFT! 
        </p>
        <ul>
          <li>Contract address: {CONTRACT_ID}</li>
          <li>Token symbol: TokenBat</li>
          <li>Token decimal: 0</li>
        </ul>
      {/if}

      <form on:submit|preventDefault={mint}>
         <button type="submit">Mint</button>
      </form>


      <form on:submit|preventDefault={transfer}>
         <button type="submit">Transfer</button>
      </form>


      <form on:submit|preventDefault={transfer_me}>
         <button type="submit">Transfer Me</button>
      </form>

      <section>
        <span>{currentMinted} Baterías son Suyas</span>
      </section>

      <h2>Your Tokens:</h2>

      {#if owner_logged_in}
       <h1>Owner Logged In</h1>
       {#if ethereum}
          <section>
             <button on:click={withdraw}>WithDraw</button>
           </section>
        {/if}
      {/if}

      {#if ownedTokens}
        <section>
          <ul class="grid">
            {#each ownedTokens as token}
              <li id="token_{token.id}">
                <div class="grid-image">
                  <img src={token.image} alt={token.description} />
                </div>
                <div class="grid-footer">
                  <h2>{token.name}</h2>
                  <h2>{token.id} </h2>
                  <span>{token.description}</span>
                  <form on:submit|preventDefault={redeem(token.id)}>
                    <button type="submit">Redeem</button>
                  </form>
                </div>
              </li>
            {/each}
          </ul>
        </section>
      {:else}
        <section>
          No tienes ningún tokenBAT. Compra uno con el botón Acuñar.
        </section>
      {/if}

    {:else}
      <h1>👋 Welcome to Cloudflare Web3.</h1>
      <h2>Login with Metamask to mint your NFT</h2>
      <button on:click={login}>Login</button>
    {/if}

  {:else}
    <h1>This app requires a Metamask wallet.</h1>
    <p>
      You won't be asked to add any money. Install Metamask
      <a href="https://metamask.io/">here</a>.
    </p>
    <p>
      Then follow <a href="https://github.com/cloudflare/cfweb3"
        >these instructions</a
      > to get started.
    </p>
  {/if}

</main>

<footer>
  Built with <a href="https://pages.dev">Pages</a>
  and <a href="https://workers.dev">Workers</a>, and open-source
  <a href="https://github.com/cloudflare/cfweb3">on GitHub</a>.
  <a href="https://blog.cloudflare.com/get-started-web3"
    >Read the announcement blog post</a
  >.
</footer>
