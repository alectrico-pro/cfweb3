const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("RondaFactory", function () {

  it( "Contrato crea automáticamente una Ronda (1) para Zombies"  , async function() {
    const RONDAFACTORY = await ethers.getContractFactory("RondaFactory");
    const ronda_factory = await RONDAFACTORY.deploy();
    await ronda_factory.deployed();
    await ronda_factory.crearRonda("Esteban","980980","Los credos 9890", "Providencia", "No hay luz","Electrico");
    total_de_rondas = await ronda_factory.cuantasRondasHay();
    expect( total_de_rondas ).to.eq(1);
  });

  it( "Contrato asigna automátiamente una Ronda a un Zombie con Direccion y que tenga Baterías"  , async function() {
    const RONDAFACTORY = await ethers.getContractFactory("RondaFactory");
    const ronda_factory = await RONDAFACTORY.deploy();
    await ronda_factory.deployed();

    const transaccion_de_ronda = await ronda_factory.crearRondaConEvento("Juana",
	    "+56962000921", "Los Credos 154", "Providencia", "No tengo luz en el departamento", "Electrico");

    const ZOMBIEFACTORY = await ethers.getContractFactory("ZombieElectrico");
    const zombie_factory = await ZOMBIEFACTORY.deploy();
    await zombie_factory.deployed();

    [owner, colaborador] = await ethers.getSigners(); 
    //console.log( "Colaborador addresss", colaborador.addresss);	  
    const esteban = await zombie_factory.crearZombieElectrico("Esteban", colaborador.address );

    //No hay que trabajar directament con las direcciones, solo con los id de zombies y los id de rondas
    const _zombie_id = await zombie_factory.getZombieId( colaborador.address); 
    //console.log("Dirección del colabodorador-> que luego se convertirá en zombie", colaborador.address);
    expect( _zombie_id ).to.eq(0);
    //El id de ronda queda disponible en el evento que se ha envíado a cada zombie 
    //Es el sistem el que asigna automáticamente la ronda
    _ronda_id = 0;
    await ronda_factory.asignarRondaAZombie( _ronda_id, colaborador.address );	  
    const _zombie_address = await ronda_factory.getZombieFromRonda(_ronda_id);
    //console.log("Zombie Dirección" , _zombie_address );

  });



});
