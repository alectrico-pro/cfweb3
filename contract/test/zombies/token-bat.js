const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("TokenBat", function () {
  it("Should deploy", async function () {
    const TokenBat = await ethers.getContractFactory("TokenBat");
    const token_bat = await TokenBat.deploy();
    await token_bat.deployed();
  });

  it("Can mint if is the owner", async function () {
    const TokenBat = await ethers.getContractFactory("TokenBat");
    const token_bat = await TokenBat.deploy();
    await token_bat.deployed();

    const accounts = await ethers.getSigners();
    const wallet = accounts[0]

    expect( token_bat.mintToken(1, wallet.address))
      .to.emit( token_bat, 'Minted')
      .withArgs(0, wallet.address);
  });

  it("Can mint if sales started", async function () {
    const TokenBat = await ethers.getContractFactory("TokenBat");
    const token_bat = await TokenBat.deploy();
    await token_bat.deployed();
    await token_bat.startSale();
    const accounts = await ethers.getSigners();

    const [owner, other] = await ethers.getSigners();
    const wallet = accounts[owner, other]
    await expect(
      token_bat.connect(other).mintToken(1, other.address))
      .to.emit( token_bat, 'Minted')
      .withArgs(0, other.address);
  });


  it("Can check if a token exists", async function () {
    const TokenBat = await ethers.getContractFactory("TokenBat");
    const token_bat = await TokenBat.deploy();
    await token_bat.deployed();

    const accounts = await ethers.getSigners();
    const wallet = accounts[0]
    await token_bat.mintToken(1, wallet.address)

    expect(await token_bat.tokenExists(0))
      .to.eq(true)
  });

  it("Can get a token URI", async function () {
    const TokenBat = await ethers.getContractFactory("TokenBat");
    const token_bat = await TokenBat.deploy();
    await token_bat.deployed();

    const accounts = await ethers.getSigners();
    const wallet = accounts[0]
    await token_bat.mintToken(1, wallet.address)

    const id = 0

    expect(await token_bat.tokenURI(id))
      .to.eq(`https://nft.alectrico.workers.dev/${id}`)
  });

  it("Non-owners Can't mint if sale hasn't started", async function () {
    const TokenBat = await ethers.getContractFactory("TokenBat");
    const token_bat = await TokenBat.deploy();
    await token_bat.deployed();

    const [owner, addr1] = await ethers.getSigners();
    await expect(
      token_bat.connect(addr1).mintToken(1, addr1.address)
    ).to.be.revertedWith("sale hasn't started")
  });

  it("Can't mint more than 3", async function () {
    const TokenBat = await ethers.getContractFactory("TokenBat");
    const token_bat = await TokenBat.deploy();
    await token_bat.deployed();
    await token_bat.startSale()

    const [owner, addr1] = await ethers.getSigners();
    await expect(
      token_bat.connect(addr1).mintToken(5, addr1.address)
    ).to.be.revertedWith("exceeds 3")
  });

  it("Can't mint once over limit", async function () {
    this.timeout(160000)

    const TokenBat = await ethers.getContractFactory("TokenBat");
    const token_bat = await TokenBat.deploy();
    await token_bat.deployed();
    await token_bat.startSale()

    const [owner, addr1] = await ethers.getSigners();
    for (let i = 0; i < 64; i++) {
      token_bat.connect(addr1).mintToken(1, addr1.address)
    }

    await expect(
      token_bat.connect(addr1).mintToken(1, addr1.address)
    ).to.be.revertedWith("sold out")
  });
});
