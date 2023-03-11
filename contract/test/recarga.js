const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Recarga Deployment", function () {
  it("Should deploy", async function () {
    const BatteryFactory = await ethers.getContractFactory("Recarga");
    const token_bat = await BatteryFactory.deploy();
    await token_bat.deployed();
  });
});


describe("Recarga Receiving Ether", function () {

  let token_bat;
  let owner;
  let other;
  let wallet;
  let max_tokens;

  beforeEach( async function (){
    wallet = ethers.Wallet.createRandom();
    const Recarga = await ethers.getContractFactory("Recarga");
    contrato       = await Recarga.deploy();
    await contrato.deployed();
    //accounts are provided by Metmask to frontend
    const accounts = await ethers.getSigners();
    owner          = accounts[0]
    other          = accounts[1]
    wallet         = accounts[owner, other];
  });

  it("Can recive Ether if the right pricee", async function () {
    expect(
      other.sendTransaction({
       to: contrato.address,
      value: ethers.utils.parseEther("0.007")
     })
    ).to.emit( contrato, "LogDepositReceived")});
});

