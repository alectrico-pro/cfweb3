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

    mapping( uint => address ) public zombieToDireccion;
    mapping( address => uint ) public direccionToZombie;

    //El propietario asigna la dirección de un colaborador real
    //A uno de sus zombies existentes
    //De esa manera podrá hacer los cobros de comisiones más adelante
    //Que en este caso, son baterías

    function _setAddressToZombie(uint _zombieId, address direccion) public {
       require( msg.sender == zombieToOwner[_zombieId]);
       zombieToDireccion[ _zombieId] = direccion ;
       direccionToZombie[ direccion ] = _zombieId ;
    }

    function crearZombieElectrico( string memory _name, address direccion ) public {
        crearRandomZombie( _name );
        uint id = zombies.length - 1 ;
        _setAddressToZombie( id, direccion );
    }

    function setMyNumber( uint _myNumber) public {
        favoriteNumber[ msg.sender ] = _myNumber;
    }

    function getMyNumber() public view returns (uint) {
        return favoriteNumber[ msg.sender];
    }

    function getZombieId( address direccion ) public view returns (uint) {
        return direccionToZombie[ direccion];
    }


    function cuantosZombiesTengo() public view returns (uint) {
        return ownerZombieCount[msg.sender];
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
