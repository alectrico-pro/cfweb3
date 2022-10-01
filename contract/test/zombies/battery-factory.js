const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("BatteryFactory", function () {

  it( "Popietario crea una (1) Batería para Zombies Eléctricos" , async function() {
    const BATTERYFACTORY = await ethers.getContractFactory("BatteryFactory");
    const battery_factory = await BATTERYFACTORY.deploy();
    await battery_factory.deployed();
   
    await battery_factory.crearRandomBat("Duracell");
    const mis_baterias = await battery_factory.cuantasBateriasHay();
    expect( mis_baterias ).to.eq(1);
	  
  });

	 
  it( "Zombie se compra una (1) Batería para Zombies Eléctricos y el Contrato le mintea un TokenBat" , async function() {
    const BATTERYFACTORY = await ethers.getContractFactory("BatteryFactory");
    const battery_factory = await BATTERYFACTORY.deploy();
    await battery_factory.deployed();

    await battery_factory.crearRandomBat("Duracell");
    const mis_baterias = await battery_factory.cuantasBateriasHay();
    expect( mis_baterias ).to.eq(1);

  });


});
