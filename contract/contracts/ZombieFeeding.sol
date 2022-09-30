//SPDX-License-Identifier: GPL-30
pragma solidity ^0.8.0;
import "./ZombieFactory.sol";


//Combina dos Dna
//Trataré de hacer algo parcido con el zombie electrico
//Donde el dna sea el de una batería
contract ZombieFeeding is ZombieFactory {
 function feedAndMultiply(uint _zombieId, uint _targetDna) public {
   require(msg.sender == zombieToOwner[_zombieId] );
   Zombie storage myZombie = zombies[_zombieId] ;
   _targetDna = _targetDna % dnaModulus;
   uint newDna =  (myZombie.dna + _targetDna) / 2;
   _crearZombie("SinNombre", newDna );
 }
}
