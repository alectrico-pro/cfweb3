//Es un zombie alimentado por baterías
//SPDX-License-Identifier: GPL-30
pragma solidity ^0.8.0;
import "./ZombieFactory.sol";
import "./BatteryFactory.sol";


//Un zombie electricos es una zombie alimentado por
//Baterías, si no tiene baterías es peso muerto
contract ZombieElectrico is ZombieFactory {
  
  
  function feedAndMultiply(uint _zombieId, uint _targetDna) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    // Add an if statement here
    _crearZombie("NoName", newDna);
  }

  //El zombie consume una batería,
  //Más bien se combina a nivel de adn con una batería
  function feedOnBat(uint _zombieId, uint _batId) public {
    uint batDna;
    //batDna = bats[_batId ].dna;
    //feedAndMultiply(_zombieId, batDna);
  }

}
