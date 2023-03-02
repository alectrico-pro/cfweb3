<script>

  import { ethers } from "ethers";
  import { onMount } from "svelte";


  import Contract from "./TokenBat.sol/TokenBat.json";

//localhost
//CFNFT deployed to: 0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1
//TokenBat deployed to: 0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44
//ZombieFactory deployed to: 0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f
//ZombieElectrico deployed to: 0x4A679253410272dd5232B3Ff7cF5dbB88f295319
//RondaFactory deployed to: 0x7a2088a1bFc9d81c55368AE168C2C02570cB814F
//BatteryFactory deployed to: 0x09635F643e140090A9A8Dcd712eD6285858ceBef


  const CONTRACT_ID = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9";
//localhost
//CFNFT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
//TokenBat deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
//ZombieFactory deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
//ZombieElectrico deployed to: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
//RondaFactory deployed to: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
//BatteryFactory deployed to: 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707


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

  //variables comunes a los dos contratos CFNFT y TokenBat
  let chain, provider, signer;

  //variables del contrato CFNFT
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
    init_token_bats();
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

{#if chain === "5"}
  <div class="warning">
    This marketplace is connected to the Goerli test network.
  </div>
{:else}
  <div class="error">
    This application requires you to be on the Goerli network. Use Metamask to
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
