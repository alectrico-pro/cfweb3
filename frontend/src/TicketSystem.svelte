<script>

  import { ethers } from "ethers";
  import { onMount } from "svelte";


  import Contract from "./TicketSystem.sol/TicketSystem.json";
  const CONTRACT_ID = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c";
  const ethereum = window.ethereum;

  let chain, provider, signer;

  //variables del contrato Ticketsystem
  let contract, contractWithSigner;

  let maxTokens = -1;
  let currentMinted = -1;
  let ownedTokens = [];
  let recentlyMintedTokens = [];

  let account = null;
  let minted = false;
  let loading = false;
  let quantity = 1;

  onMount(() => {
    chain = window.ethereum.networkVersion;
  });


  if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ID, Contract.abi, provider);
    contractWithSigner = contract.connect(signer);
    contractWithSigner.setPriceToPay(100);

  }
  
  async function init() {
    if (!account && ethereum.selectedAddress) {
      account = ethereum.selectedAddress;
    }

    if (account) {
      //findCurrentOwned();
     // findCurrentMinted();
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
    await contractWithSigner.mintToken(quantity, account, {value: "7000000000000000"});
    loading = true;
    contractWithSigner.on("Minted", (from, to, amount, event) => {
      minted = true;
      loading = false;
      currentMinted += 1;
    });
  }


  async function buy_ticket() {
    await contractWithSigner.buyToken();
    loading = true;
    contractWithSigner.on("Minted", (from, to, amount, event) => {
      minted = true;
      loading = false;
      currentMinted += 1;
    });
  }



  async function findCurrentOwned() {
    const numberOfTokensOwned = await contract.balanceOf(account);
    for (let i = 0; i < Number(numberOfTokensOwned); i++) {
      const token = await contract.tokenOfOwnerByIndex(account, i);
      const URI = await contract.tokenURI(token);
      const response = await fetch(URI);

      const result = await response.json();
      result.id = token;

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
      const token = MintEvent.args.tokenId;
      const URI = await contract.tokenURI(token);
      const response = await fetch(URI);

      const result = await response.json();
      result.id = token;

      recentlyMintedTokens.push(result);
      recentlyMintedTokens = recentlyMintedTokens;
    });
  }

  async function fetchRecentlyTokenBatsMinted() {
    let recentMintEvents = await token_bat.queryFilter({
      topics: [
       "0xb9203d657e9c0ec8274c818292ab0f58b04e1970050716891770eb1bab5d655e",
      ],
    });

    recentMintEvents = recentMintEvents.slice(-3);

    await recentMintEvents.map(async (MintEvent) => {
      const token = MintEvent.args.tokenId;
      const URI = await token_bat.tokenURI(token);
      const response = await fetch(URI);

      const result = await response.json();
      result.id = token;

      recentlyMintedTokenBats.push(result);
      recentlyMintedTokenBats = recentlyMintedTokenBats;
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

      <form on:submit|preventDefault={mint}>
        <input
          type="number"
          min="1"
          max="3"
          placeholder="Quantity to mint"
          bind:value={quantity}
        />

        {#if currentMinted >= maxTokens}
          <button disabled type="submit">Sin Tokens</button>
        {:else}
          <button type="submit">Mint</button>
        {/if}

      </form>

     <section>
        <span>{currentMinted}/{maxTokens} minted</span>
      </section>



      <form on:submit|preventDefault={buy_ticket}>
        <input
          type="number"
          min="1"
          max="3"
          placeholder="Quantity to mint"
          bind:value={quantity}
        />

        <button type="submit">Comprar Ticket</button>

      </form>



      <h2>Your Tokens:</h2>
      {#if ownedTokens}
        <section>
          <ul class="grid">
            {#each ownedTokens as token}
              <li>
                <div class="grid-image">
                  <a
                    href={`https://testnets.opensea.io/assets/0xAFF1cc0473460503BcBC0e5FB57D1a9e6f7e3c6f/${token.id}`}
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
      {:else}
        <section>
          You don't have any tokens. Mint one with the button above to add it to
          your collection.
        </section>
      {/if}

    {:else}
      <h1>👋 Welcome to Cloudflare Web3.</h1>
      <h2>Login with Metamask to mint your NFT</h2>
      <button on:click={login}>Login</button>

      <h2>Recently Minted NFTs:</h2>
      {#if recentlyMintedTokens}
        <section>
          <ul class="grid">
            {#each recentlyMintedTokens as token}
              <li>
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
