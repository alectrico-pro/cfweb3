<script>

  import { ethers } from "ethers";
  import { onMount } from "svelte";


  import Contract from "./TokenBat.sol/TokenBat.json";
  const CONTRACT_ID = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const ethereum = window.ethereum;

  let chain, provider, signer;

  //variables del contrato TokenBat
  let contract, contractWithSigner;

  let maxTokens = -1;
  let currentMinted = -1;
  let ownedTokens = [];
  let recentlyMintedTokens = [];

  let account = null;
  let minted = false;
  let loading = false;

  let redeemed = false;
  let withdrawed = false;

  onMount(() => {
    chain = window.ethereum.networkVersion;
  });

  if (ethereum) {
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
      findCurrentOwned();
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
    await contractWithSigner.mintToken( account, {value: "7000000000000000"});
    redeemed = false;
    loading = true;

    contractWithSigner.on("Minted", (from, to, transaccion, event) => {
      fetchLastMinted();
     // if (loading == false) {
      //  fetchLastMinted();
     // }
      redeemed = false;
      loading = false;
    });
  }

  async function withdraw() {
    await contractWithSigner.withdrawBalance();
    withdrawed= false;
    loading = true;

    contractWithSigner.on("Withdrawed", (from, to, transaccion, event) => {
      console.log("Withdrawed");
      redeemed = false;
      loading = false;
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


  async function findCurrentOwned() {

    const numberOfTokensOwned = await contract.balanceOf(account);
    for (let i = 0; i < Number(numberOfTokensOwned); i++) {
      const token    = await contract.tokenOfOwnerByIndex(account, i);
      const URI      = await contract.tokenURI(token);
      const response = await fetch(URI);
      const result   = await response.json();
      result.id      = token;
      ownedTokens.push(result);
    }
    ownedTokens = ownedTokens;
  }

  async function findCurrentMinted() {
    const total = await contract.MAX_TOKENS();
    const supply = await contract.totalSupply();
    maxTokens = Number(total);
    currentMinted = Number(supply);

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

{#if chain === "1337"}
  <div class="warning">
    This marketplace is connected to the Local test network.
  </div>
{:else}
  <div class="error">
    This application requires you to be on the Local test network. Use Metamask to
    switch networks.
  </div>
{/if}


<main>
  {#if ethereum}
    {#if account}
      <h1>👋 Welcome to the Cloudflare Web3 app</h1>
      <h2>You are currently logged in as {account.slice(0, 5)}</h2>
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
        {#if currentMinted >= maxTokens}
          <button disabled type="submit">Sold out</button>
        {:else}
          <button type="submit">Mint</button>
        {/if}

      </form>

      <section>
        <span>{currentMinted}/{maxTokens} minted</span>
      </section>

      <h2>Your Tokens:</h2>
        <section>
           <button on:click={withdraw}>WithDraw</button>
        </section>

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

      {#if recentlyMintedTokens}
        <section>
          <ul class="grid">
            {#each recentlyMintedTokens as token}
              <li id ={token.id}>
                <div class="grid-image">
                  <a
                    href={`https://testnets.opensea.io/assets/0x290422ec6eadc2cc12acd98c50333720382ca86b/${token.id}`}
                  >
                    <img src={token.image} alt={token.description} />
                  </a>
                </div>
                <div class="grid-footer">
                  <h2>{token.name}</h2>
                  <span>{token.description}</span>
                </div>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
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
