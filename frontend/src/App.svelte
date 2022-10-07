<script>

  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import Contract from "./CFNFT.sol/CFNFT.json";
  import TokenBat from "./TokenBat.sol/TokenBat.json";

  //NO BORRAR- ESTE ES EL ORIGINAL- const CONTRACT_ID = "0x290422EC6eADc2CC12aCd98C50333720382CA86B"; PERO YA DEPRECÓ JUNTO CON RINKEBY DESDE 5 octubre 2022
  //Estas direcciones son de Goerli
  const CONTRACT_ID = "0xAFF1cc0473460503BcBC0e5FB57D1a9e6f7e3c6f";

  //Esta es la dirección del contracto cuyo propietario es alectrico®
  //en rinkeby
  const TOKEN_BAT_ID = "0xee5c4f04835A6CF895c2d7f4311aA5f0F8a54855";

//
//cfweb3-goerli-1  | Compiling 30 files with 0.8.4
//cfweb3-goerli-1  | Compilation finished successfully
//cfweb3-goerli-1  | CFNFT deployed to: 0xAFF1cc0473460503BcBC0e5FB57D1a9e6f7e3c6f
//cfweb3-goerli-1  | TokenBat deployed to: 0xee5c4f04835A6CF895c2d7f4311aA5f0F8a54855
//cfweb3-goerli-1  | ZombieFactory deployed to: 0xa5BD6A802dd33730db519DAb0408A90D4989Cc53
//cfweb3-goerli-1  | ZombieElectrico deployed to: 0x695F6276F357cd98bCd26033Dc453A900FB259d7
//cfweb3-goerli-1  | RondaFactory deployed to: 0xe6974c29a577c0ca1e8311c488cebb1b1c9Cf3Ca
//cfweb3-goerli-1  | BatteryFactory deployed to: 0xdA56E81a5eF2B995f1323475241091f6755704Ba


  const ethereum = window.ethereum;

  let token_bat, token_bat_WithSigner, chain, provider, signer, contract, contractWithSigner;

  let maxTokens = -1;
  let token_bat_maxTokens = -1;
  let token_bat_currentMinted = -1;
  let ownedTokenBats = [];


  let currentMinted = -1;
  let account = null;
  let minted = false;
  let loading = false;
  let quantity = 1;
  let ownedTokens = [];
  let recentlyMintedTokens = [];

  onMount(() => {
    chain = window.ethereum.networkVersion;
  });

  // If Metamask is installed
  if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();

    contract = new ethers.Contract(CONTRACT_ID, Contract.abi, provider);
    contractWithSigner = contract.connect(signer);
  }
   
  if (ethereum) {
  
    token_bat = new ethers.Contract(TOKEN_BAT_ID, TokenBat.abi, provider);
    token_bat_WithSigner = token_bat.connect(signer);


    ethereum.on("accountsChanged", function (accounts) {
      account = accounts[0];
    });

  }
 
  if (ethereum) {

    ethereum.on("chainChanged", function () {
      window.location.reload();
    });

    init();
  }

  if (ethereum) {
    init_token_bats();
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


  async function init_token_bats() {
    if (!account && ethereum.selectedAddress) {
      account = ethereum.selectedAddress;
    }

    if (account) {
      findTokenBatsOwned();
     // findCurrentTokenBatsMinted();
    } else {
     // fetchRecentlyTokenBatsMinted();
    }
  }

  async function login() {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    account = accounts[0];
    init();
    init_token_bats();
  }




  async function token_bat_mint() {
    await token_bat_WithSigner.mintToken(quantity, account);
    loading = true;
    token_bat_mintWithSigner.on("Minted", (from, to, amount, event) => {
      minted = true;
      loading = false;
      token_bat_currentMinted += 1;
    });
  }

  async function findTokenBatsOwned() {
    const numberOfTokensOwned = await token_bat.balanceOf(account);
    for (let i = 0; i < Number(numberOfTokensOwned); i++) {
      const token = await token_bat.tokenOfOwnerByIndex(account, i);
      const URI = await token_bat.tokenURI(token);
      const response = await fetch(URI);

      const result = await response.json();
      result.id = token;

      ownedTokenBats.push(result);
    }
    ownedTokenBats = ownedTokenBats;
  }









  async function mint() {
    await contractWithSigner.mintToken(quantity, account);
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


    const token_bat_total = await token_bat.MAX_TOKENS();
    const token_bat_supply = await token_bat.totalSupply();

    token_bat_maxTokens = Number(token_bat_total);
    token_bat_currentMinted = Number(token_bat_supply);


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

{#if chain === "4"}
  <div class="warning">
    This marketplace is connected to the Rinkeby test network.
  </div>
{:else}
  <div class="error">
    This application requires you to be on the Rinkeby network. Use Metamask to
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
          <li>Token symbol: CFNFT</li>
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
          <button disabled type="submit">Sold out</button>
        {:else}
          <button type="submit">Mint</button>
        {/if}

      </form>

      <section>
        <span>{currentMinted}/2048 minted</span>
      </section>

      <h2>Your Tokens:</h2>
      {#if ownedTokens}
        <section>
          <ul class="grid">
            {#each ownedTokens as token}
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
      {:else}
        <section>
          You don't have any tokens. Mint one with the button above to add it to
          your collection.
        </section>
      {/if}




      <form on:submit|preventDefault={token_bat_mint}>
        <input
          type="number"
          min="1"
          max="3"
          placeholder="Quantity to mint"
          bind:value={quantity}
        />

        {#if token_bat_currentMinted >= token_bat_maxTokens}
          <button disabled type="submit">Sold out</button>
        {:else}
          <button type="submit">TokenBatMint</button>
        {/if}

      </form>

      <section>
        <span>{token_bat_currentMinted}/64 minted</span>
      </section>

      <h2>Your TokenBats:</h2>
      {#if ownedTokenBats}
        <section>
          <ul class="grid">
            {#each ownedTokenBats as token}
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
      {:else}
        <section>
          You don't have any token_bats. Mint one with the button above to add it to
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
