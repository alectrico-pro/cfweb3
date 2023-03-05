const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("ZombieFactory", function () {

  it( "ZOMBIE FACTORY debiese poder ser implementado", async function() { 
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieFactory");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed(); 

  });

  it( "Proipetario crea un ZOMBIE" , async function() {
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieFactory");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();
    const esteban = await zombie_factory.crearRandomZombie("Esteban");	  
  });


  it( "Propietario debise poder almacenar su número (fono?) " , async function() {
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieFactory");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();
    const esteban = await zombie_factory.setMyNumber(1);
  });

  it( "Propietario  obtiene número que había almacenado (fono?)" , async function() {
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieFactory");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();
    await zombie_factory.setMyNumber(1);
    const mi_numero = await zombie_factory.getMyNumber();
    expect( mi_numero ).to.eq(1);
  });

  it( "Propietario crea un (1) ZOMBIE Electrico" , async function() {
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieElectrico");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();
    const esteban = await zombie_factory.crearRandomZombie("Esteban");  
    const mis_zombies = await zombie_factory.cuantosZombiesTengo();
    expect( mis_zombies ).to.eq(1);
  });


  it( "Propietario crea un Zombie con Direccion"  , async function() {
    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieElectrico");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();
    [owner, colaborador] = await ethers.getSigners();  
    //console.log( "Owner address", owner.address );
    const esteban = await zombie_factory.crearZombieElectrico("Esteban", colaborador.address );
  });

});
