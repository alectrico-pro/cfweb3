const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("BatteryFactory Deployment", function () {
  it("Should deploy", async function () {
    const BatteryFactory = await ethers.getContractFactory("BatteryFactory");
    const token_bat = await BatteryFactory.deploy();
    await token_bat.deployed();
  });
})


describe("BatteryFactory minting", function () {

  let token_bat;
  let owner;
  let other;
  let wallet;
  let max_tokens;
  beforeEach( async function (){

    wallet = ethers.Wallet.createRandom();
    //console.log(wallet);
    // alectrico = wallet.mnemonic;
    //console.log(alectrico);
    //BatteryFactorys are being deployed to a chain once	  
    const BatteryFactory = await ethers.getContractFactory("BatteryFactory");
    token_bat      = await BatteryFactory.deploy();
    await token_bat.deployed();
    //await token_bat.setPriceToMint( "2000");

    //accounts are provided by Metmask to frontend
    const accounts = await ethers.getSigners();
    owner          = accounts[0]
    other          = accounts[1]
    wallet         = accounts[owner, other];
    max_tokens     = await token_bat.cuantasBateriasHay(); });;

   // const address = ethers.provider.resolveName("alectrico.eth");
   // const balance = ethers.provider.getBalance("alectrico.eth");
   //https://www.quicknode.com/guides/ethereum-development/wallets/how-to-resolve-ens-domains-using-javascript-and-quicknode/
  //When user press Mint on Frontend
  it("Can mint if pay the price", async function () {
    expect( token_bat.crearRandomBat( "MickyBat" , {value: "7000000000000000"}))
      .to.emit( token_bat, 'NewBat')     });
 
  it("Can't mint for free", async function () {
    expect( token_bat.crearRandomBat( "MickyBat" , {value: "2000"}))
      .to.be.revertedWith( 'pay to mint')     });

  it("Can withdraw royalty", async function () {
    balance_owner = await ethers.provider.getBalance(owner.address);
    balance_other = await ethers.provider.getBalance(other.address);
    await token_bat.crearRandomBat( "MickyBat" , {value: "7000000000000000"});      
    post_balance_owner = await ethers.provider.getBalance(owner.address);
    post_balance_other = await ethers.provider.getBalance(other.address);
    expect( post_balance_owner).be.lt( balance_owner );
    expect( post_balance_other).be.eq( post_balance_other) ;
 });

 it("Logged_in user los money at withdrawal", async function () {
    balance_owner = await ethers.provider.getBalance(owner.address);
    await token_bat.crearRandomBat( "MickyBat" , {value: "7000000000000000"});
    post_balance_owner = await ethers.provider.getBalance(owner.address);
    expect( post_balance_owner).be.lt( balance_owner );
 });

 it("Other user not los money at withdrawal of owner", async function () {
    balance_owner = await ethers.provider.getBalance(other.address);
    await token_bat.crearRandomBat( "MickyBat" , {value: "7000000000000000"});
    post_balance_owner = await ethers.provider.getBalance(other.address);
    expect( post_balance_owner).be.eq( balance_owner );
 });
	
 it("alectrico.eht should increse funds after withdrawal durin minting", async function () {
    balance_alectrico = await ethers.provider.getBalance("0xf9f84a5b6889273890ef18C2694eEd446320aec6");
    await token_bat.crearRandomBat( "MickyBat" , {value: "7000000000000000"});
    post_balance_alectrico = await ethers.provider.getBalance("0xf9f84a5b6889273890ef18C2694eEd446320aec6");
    expect( post_balance_alectrico).be.gt( balance_alectrico );
 });

 it("alectrico.eth should earn 6300000000000000 gwei each mint", async function () {
    balance_alectrico = await ethers.provider.getBalance("0xf9f84a5b6889273890ef18C2694eEd446320aec6");
    await token_bat.crearRandomBat( "MickyBat" , {value: "7000000000000000"});
    post_balance_alectrico = await ethers.provider.getBalance("0xf9f84a5b6889273890ef18C2694eEd446320aec6");
    expect( post_balance_alectrico - balance_alectrico ).to.eq( 6300000000000000 );
 });

});
