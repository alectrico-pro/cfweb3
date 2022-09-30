// SPDX-License-Identifier: UNLINCESED
pragma solidity ^0.8.0;

contract ZombieFactory {

    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie 
    {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    mapping( uint => address ) public zombieToOwner;
    mapping( address => uint ) ownerZombieCount;
    mapping( address => uint ) favoriteNumber;


    function setMyNumber( uint _myNumber) public {
        favoriteNumber[ msg.sender ] = _myNumber;
    }

    function getMyNumber() public view returns (uint) {
        return favoriteNumber[ msg.sender];
    }

    function _crearZombie(string memory _name, uint _dna) internal
    {
        Zombie memory zombie = Zombie(_name, _dna);
        zombies.push(zombie) ;
        uint id = zombies.length - 1;
        emit NewZombie(id, _name, _dna);
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
    }

    function _generateRandomDna(string memory _str) private view returns (uint)     {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function crearRandomZombie(string memory _name) public
    {
        require( ownerZombieCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        _crearZombie(_name, randDna);
    }

}
