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

    

    await token_bat.setPriceToMint( "2000");


    //The contracts'owner mint a new token
    await token_bat.connect(owner).mintToken( owner.address, {value: "2000"});
    owner_token_id = await token_bat.connect(owner).tokenOfOwnerByIndex(owner.address, 0);
	  
    //max_tokens is an important feature that allow
    //scarcity effect on token, so they can increase
    //value over time
    max_tokens     = await token_bat.MAX_TOKENS(); });;

  //When owner press Canjear in the Frontend
  it("Should Redeem at contract owner's request", async function () {
    expect( token_bat.connect(owner).redeemToken(owner_token_id))
      .to.emit( token_bat, 'Redeemed')
      .withArgs(0);  });

  it("Can't Redeem at call from other and when not sales started", async function () {
    expect( token_bat.connect(other).redeemToken(0))
      .to.be.revertedWith("you don't owned this token") });


  describe("Token redeemed can't be minted again", function () { 
    beforeEach( async function (){
      //In this secenary we have alreadey a token owne by contract's owner
      // with index 0
      //Now others will try to mint another token
      //that will get index 0
      //Note that index get locale with owner
      //Then each differente token's has tokens a 0 index
      await token_bat.startSale();
      await token_bat.setPriceToMint( "2000");
      await token_bat.connect(other).mintToken( other.address, {value: "2000"});  
      other_token_id = await token_bat.connect(other).tokenOfOwnerByIndex(other.address, 0);
    });

    it( "As soon as new token exists on the contract", async function () { 
       expect ( await token_bat.connect(other).ownerOf(other_token_id)).to.eq(other.address)
    })

    it( "token's id are always under totalSupply number", async function () { 
	expect( await token_bat.totalSupply()).to.be.gt( other_token_id)
    })

     //minToken use total_suply as id for the new tokens
     //but redeem afected total_suply and should'nt be
     //use again as index form tokens
    it( "minToken can't get stuck after redeem", async function () {
      await token_bat.connect(other).mintToken( other.address, {value: "2000"});
      total = await token_bat.connect(other).totalSupply();
      //we have minted two others token and one owner token, 
      //this totalize 3 tokens on the contract
      expect(total).to.eq(3);
      //now we want the id for the last other token, 
      //fora that we need thee index
      //as other has only two tokens, index have to be 1
      //for thae last token minted
      tk_id = await token_bat.connect(other).tokenOfOwnerByIndex(other.address, 1);
      //now we are interested in investigate if reedemToken can stuck mintToken
      await token_bat.connect(other).redeemToken(tk_id);

      //if redeemToken is doin well
      //we should succed on performin another mintToken after redeemToken
      await expect(
        token_bat.connect(other).mintToken( other.address, {value: "2000"})
      ).to.not.be.reverted;

      //To be more clear, we have further investiaged totalSupply
      total_for_other= await token_bat.connect(other).totalSupply();
      //Total supply result remain the same if performing reedem and mint
      //The are contrarresring each other
      expect(total_for_other).to.eq(3);

      //But if totalSuplly was locally per accountes connected
      total_for_owner= await token_bat.connect(owner).totalSupply();
      //But we can check tha total supply is not local to accounts as it represent
      //total of some thins on the contract
      expect(total_for_owner).not.to.eq(1);


      //At this time we can allow tha new tokens receive totalSupply as index
      //as it will be alwats increasing as minting accumulate tokens on contract
      //now what happen with the token tk_id that was burned
      //better, who is on the index 1 thas formerly was useed to hot tk_id
      last_token_id = await token_bat.connect(other).tokenOfOwnerByIndex(other.address, 1);
      console.log(last_token_id);
      //would burned last_token_id really represent a valid token now?
      expect( await token_bat.connect(other).ownerOf(last_token_id)).to.eq(other.address)	    
      //appear that burned tokens are with their formerly owner, thats is true
      //appear that burned tokens remain as a property but do not count against totalSupply
     
      //We ned to using other form of minting that do not relay on totalSupply being the
      //index for new tokens being minte
      //may we need to use some techniques from databases about last_id
      //so we need to store last_id o blockchain or perhaps we count on 
      //totalOwned to to that.
      //let checkout about totalOwned
      balance_owner = await token_bat.connect(owner).balanceOf(owner.address);
      balance_other = await token_bat.connect(other).balanceOf(other.address);

      //But we can check tha total supply is not local to accounts as it represent
      //total of some thins on the contract
      //But if we ned local total we can use  balanceOf for the account we need
      console.log("balances");
      console.log(balance_other);
      console.log(balance_owner);
      expect(Number(balance_other) + Number(balance_owner)).to.be.eq(total_for_owner);


    })  
  })
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
    await token_bat.setPriceToMint( "2000");

    //accounts are provided by Metmask to frontend
    const accounts = await ethers.getSigners();
    owner          = accounts[0]
    other          = accounts[1]
    wallet         = accounts[owner, other];
    //max_tokens is an important feature that allow
    //scarcy effect on token, so they can increase
    //value over time
    max_tokens     = await token_bat.MAX_TOKENS(); });;




  it("Should withdraw then full Balance to the owner account", async function () {
     await expect( token_bat.connect(owner).withdrawBalance())
                  .to.not.eq(true) });

  it("Other can't withdraw", async function () {
     await expect( token_bat.connect(other).withdrawBalance()) 
                  .to.be.reverted });

  it("Should revert minting token when no pay", async function () {
     await expect( token_bat.mintToken( owner.address ))
                  .to.be.revertedWith('pay to mint') });


  it("Can't grant Eality of inventorie when no money was passed", async function () {
     await expect( token_bat.mintToken( owner.address, { value: "2001"} ))
                  .to.be.revertedWith('pay to mint') });


  it("Can Gran Equality of inventorie when money was passed", async function () { 	
     expect( await token_bat.mintToken( owner.address, { value: "2000"} ))
                  .to.changeEtherBalance(token_bat,"2000" )
                  .and.to.changeEtherBalance( owner,"-2000" )
                  .and.to.changeTokenBalance( token_bat, owner, 1); })

  it("Can Gran Equality of inventorie when money was passed", async function () {                  
     expect( await token_bat.mintToken( owner.address, { value: "2000"} ))
                  .to.changeEtherBalance(token_bat,"2000" )
                  .and.to.changeEtherBalance( owner,"-2000" ) })


  it("Can Gran Equality of inventorie when money was passed", async function () { 
     expect( await token_bat.mintToken( owner.address, { value: "2000"} ))
                  .to.changeEtherBalance(token_bat,"2000" ) })


  it("Protecting the minting by setting the price", async function () {
     await expect( token_bat.setPriceToMint( "2000")).to.not.be.reverted;  })


  it("Minting shoudn't be free of costs", async function () {
     await expect( token_bat.setPriceToMint( "0")).to.be.reverted;  })


  it("Only the Owner cant set the price to Mint", async function () {
     await expect( token_bat.connect(owner).setPriceToMint( "2000")).to.not.be.reverted;  })

  it("Others can't set the price to Mint", async function () {
     await expect( token_bat.connect(other).setPriceToMint( "2000")).to.be.reverted;  })

  it("Can set the price to Mint when nobdy is connected", async function () {
     await expect( token_bat.setPriceToMint( "2000")).to.not.be.reverted;  })


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
    await token_bat.setPriceToMint( "2000");

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
    expect( token_bat.mintToken( owner.address, {value: "2000"}))
      .to.emit( token_bat, 'Minted')
      .withArgs(0, owner.address);  });

  //When backend issue start of sales
  it("Can mint if sales started", async function () {
    await token_bat.startSale();
    await expect(
      token_bat.connect(other).mintToken( other.address, {value: "2000"}))
      .to.emit( token_bat, 'Minted')
      .withArgs(0, other.address);  });

  //When frontend need to show tokens earned
  it("Can check if a token exists", async function () {
    await token_bat.mintToken( owner.address, {value: "2000"})
    expect(await token_bat.tokenExists(0))
      .to.eq(true)  });

 //When frontend need to show images to each token
  it("Can get a token URI", async function () {
    await token_bat.mintToken( owner.address, {value: "2000"})
    const id = 0
    expect(await token_bat.tokenURI(id))
      .to.eq(`https://nft.alectrico.workers.dev/${id}`)  });

  //Other can't mint unless backend issued start of sales
  it("Non-owners Can't mint if sale hasn't started", async function () {
    await expect(
      token_bat.connect(other).mintToken( other.address, {value: "2000"})
    ).to.be.revertedWith("sale hasn't started")  });

  //Nobdoy can't mint more than three tokens at once
  //it("Can't mint more than 3", async function () {
  //  await token_bat.startSale()
  //  await expect(
  //    token_bat.connect(other).mintToken(5, other.address, {value: "2000"})
  //  ).to.be.revertedWith("exceeds 3")  });

  //Tokens are hard limited to MAX_TOKENS	
  it("Can't mint once over limit", async function () {
    console.log("max_tokens");
    console.log( max_tokens );
    this.timeout(160000)
    await token_bat.startSale()
    for (let i = 0; i < max_tokens ; i++) {
      token_bat.connect(other).mintToken( other.address, {value: "2000"})
    }
    await expect(
      token_bat.connect(other).mintToken( other.address, {value: "2000"})
    ).to.be.revertedWith("sold out")  });


});
