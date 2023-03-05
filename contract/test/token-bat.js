const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("TokenBat Deployment", function () {
  it("Should deploy", async function () {
    const TokenBat = await ethers.getContractFactory("TokenBat");
    const token_bat = await TokenBat.deploy();
    await token_bat.deployed();
  });
})

describe("TokenBat Redeeming", function () {

  let token_bat;
  let owner;
  let other;
  let wallet;
  let max_tokens;

  beforeEach( async function (){

    //TokenBats are being deployed to a chain once        
    const TokenBat = await ethers.getContractFactory("TokenBat");
    token_bat      = await TokenBat.deploy();
    await token_bat.deployed();

    //accounts are provided by Metmask to frontend
    const accounts = await ethers.getSigners();
    owner          = accounts[0]
    other          = accounts[1]
    wallet         = accounts[owner, other];


    //max_tokens is an important feature that allow
    //scarcy effect on token, so they can increase
    //value over time
    max_tokens     = await token_bat.MAX_TOKENS(); });;

  //When user press Canjear in the Frontend
  it("Can Redeem if is the owner", async function () {
    expect( token_bat.redeemToken(1, owner.address))
      .to.emit( token_bat, 'Redeemed')
      .withArgs(1, owner.address);  });
});

//ttps://hardhat.org/hardhat-chai-matchers/docs/overview
describe("TokenBat accounting rules", function () {
  let token_bat;
  let owner;
  let other;
  let wallet;
  let max_tokens;
  beforeEach( async function (){
    //TokenBats are being deployed to a chain once        
    const TokenBat = await ethers.getContractFactory("TokenBat");
    token_bat      = await TokenBat.deploy();
    await token_bat.deployed();
    //accounts are provided by Metmask to frontend
    const accounts = await ethers.getSigners();
    owner          = accounts[0]
    other          = accounts[1]
    wallet         = accounts[owner, other];
    //max_tokens is an important feature that allow
    //scarcy effect on token, so they can increase
    //value over time
    max_tokens     = await token_bat.MAX_TOKENS(); });;


  it("Equality of inventorie: money in => token out ", async function () {

   await expect( () => token_bat.mintToken(1, owner.address, { value: "2000"} ) )
                  .to.changeEtherBalance( 
			  token_bat, 
			  "2000" );

   await expect( () => token_bat.mintToken(1, owner.address, { value: "2000"} ))
                  .to.changeEtherBalance( 
                          owner, 
                          "-2000" );
   
   await expect(() => token_bat.mintToken(1, owner.address, { value: "2000" } ))
		  .to.changeTokenBalance(
			  token_bat,
			  owner, 
			  1);
  })

});


describe("TokenBat minting", function () {

  let token_bat;
  let owner;
  let other;
  let wallet;
  let max_tokens;

  beforeEach( async function (){

    //TokenBats are being deployed to a chain once	  
    const TokenBat = await ethers.getContractFactory("TokenBat");
    token_bat      = await TokenBat.deploy();
    await token_bat.deployed();

    //accounts are provided by Metmask to frontend
    const accounts = await ethers.getSigners();
    owner          = accounts[0]
    other          = accounts[1]
    wallet         = accounts[owner, other];


    //max_tokens is an important feature that allow
    //scarcy effect on token, so they can increase
    //value over time
    max_tokens     = await token_bat.MAX_TOKENS(); });;


  //When user press Mint on Frontend
  it("Can mint if is the owner", async function () {
    expect( token_bat.mintToken(1, owner.address))
      .to.emit( token_bat, 'Minted')
      .withArgs(0, owner.address);  });

  //When backend issue start of sales
  it("Can mint if sales started", async function () {
    await token_bat.startSale();
    await expect(
      token_bat.connect(other).mintToken(1, other.address))
      .to.emit( token_bat, 'Minted')
      .withArgs(0, other.address);  });

  //When frontend need to show tokens earned
  it("Can check if a token exists", async function () {
    await token_bat.mintToken(1, owner.address)
    expect(await token_bat.tokenExists(0))
      .to.eq(true)  });

 //When frontend need to show images to each token
  it("Can get a token URI", async function () {
    await token_bat.mintToken(1, owner.address)
    const id = 0
    expect(await token_bat.tokenURI(id))
      .to.eq(`https://nft.alectrico.workers.dev/${id}`)  });

  //Other can't mint unless backend issued start of sales
  it("Non-owners Can't mint if sale hasn't started", async function () {
    await expect(
      token_bat.connect(other).mintToken(1, other.address)
    ).to.be.revertedWith("sale hasn't started")  });

  //Nobdoy can't mint more than three tokens at once
  it("Can't mint more than 3", async function () {
    await token_bat.startSale()
    await expect(
      token_bat.connect(other).mintToken(5, other.address)
    ).to.be.revertedWith("exceeds 3")  });

  //Tokens are hard limited to MAX_TOKENS	
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
