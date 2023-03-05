const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("TokenBat Deployment", function () {
  it("Should deploy", async function () {
    const TokenBat = await ethers.getContractFactory("TokenBat");
    const token_bat = await TokenBat.deploy();
    await token_bat.deployed();
  });
})

describe("TokenBat minting", function () {

  let token_bat;
  let owner;
  let other;
  let wallet;
  let max_tokens;

  beforeEach( async function (){

    const TokenBat = await ethers.getContractFactory("TokenBat");
    token_bat      = await TokenBat.deploy();
    await token_bat.deployed();
    const accounts = await ethers.getSigners();
    owner          = accounts[0]
    other          = accounts[1]
    wallet         = accounts[owner, other];
    max_tokens     = await token_bat.MAX_TOKENS(); });;



  it("Can mint if is the owner", async function () {
    expect( token_bat.mintToken(1, owner.address))
      .to.emit( token_bat, 'Minted')
      .withArgs(0, owner.address);  });

  it("Can mint if sales started", async function () {
    await token_bat.startSale();
    await expect(
      token_bat.connect(other).mintToken(1, other.address))
      .to.emit( token_bat, 'Minted')
      .withArgs(0, other.address);  });

  it("Can check if a token exists", async function () {
    await token_bat.mintToken(1, owner.address)
    expect(await token_bat.tokenExists(0))
      .to.eq(true)  });

  it("Can get a token URI", async function () {
    await token_bat.mintToken(1, owner.address)
    const id = 0
    expect(await token_bat.tokenURI(id))
      .to.eq(`https://nft.alectrico.workers.dev/${id}`)  });

  it("Non-owners Can't mint if sale hasn't started", async function () {
    await expect(
      token_bat.connect(other).mintToken(1, other.address)
    ).to.be.revertedWith("sale hasn't started")  });

  it("Can't mint more than 3", async function () {
    await token_bat.startSale()
    await expect(
      token_bat.connect(other).mintToken(5, other.address)
    ).to.be.revertedWith("exceeds 3")  });

  it("Can't mint once over limit", async function () {
    console.log("max_tokens");
    console.log( max_tokens );
    this.timeout(160000)
    await token_bat.startSale()
    for (let i = 0; i < max_tokens ; i++) {
      token_bat.connect(other).mintToken(1, other.address)
    }
    await expect(
      token_bat.connect(other).mintToken(1, other.address)
    ).to.be.revertedWith("sold out")  });


});
