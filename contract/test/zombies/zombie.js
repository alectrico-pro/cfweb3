const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("ZOMBIE", function () {
  it( "ZOMBIE FACTORY debiese poder ser implementado", async function() { 
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieFactory");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();
  });

  it( "Debiese pode crear un ZOMBIE" , async function() {
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieFactory");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();

    const esteban = await zombie_factory.crearRandomZombie("Esteban");	  
  });


  it( "Debiese pode setear un número" , async function() {
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieFactory");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();

    const esteban = await zombie_factory.setMyNumber(1);
  });


  it( "Debiese pode crear un ZOMBIE" , async function() {
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieFactory");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();

    await zombie_factory.setMyNumber(1);
    const mi_numero = await zombie_factory.getMyNumber();
    expect( mi_numero ).to.eq(1);
  });



  it( "Debiese pode crear un ZOMBIE Electrico" , async function() {
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieElectrico");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();
    const esteban = await zombie_factory.crearRandomZombie("Esteban");
  });


  it( "Debiese pode crear un Batería de Zombies Eléctricos" , async function() {
    const BATTERYFACTORY = await ethers.getContractFactory("BatteryFactory");
    const battery_factory = await BATTERYFACTORY.deploy();
    await battery_factory.deployed();
   
    await battery_factory.crearRandomBat("Duracell");
  });


  it( "Debiese pode crear una Ronda para Zombies"  , async function() {
    const RONDAFACTORY = await ethers.getContractFactory("RondaFactory");
    const ronda_factory = await RONDAFACTORY.deploy();
    await ronda_factory.deployed();
   
    await ronda_factory.crearRondaConEvento("Juana", "+56962000921","Electrico", "Los Credos 154", "No tengo luz en el departamento", "Providencia");
  });



});
