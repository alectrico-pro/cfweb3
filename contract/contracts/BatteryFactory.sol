///Emision de Batería de recarga
// SPDX-License-Identifier: UNLINCESED
// Autor: alectrico.eth

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./TokenBat.sol";

contract BatteryFactory {

    event NewBat(uint batId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Bat 
    {
        string name;
        uint   dna;
    }

    Bat[] public bats;

    mapping( uint => address ) public batToOwner;
    mapping( address => uint ) ownerBatCount;
    mapping( address => uint ) favoriteNumber;


    function cuantasBateriasHay() public view returns (uint)  {
        // console.log("En cuantasBateriasHay" );
        return ownerBatCount[ msg.sender ];
    }

    function _crearBat(string memory _name, uint _dna) internal  {
        // console.log("En _crearBat %s, dna: %s", _name, _dna);
        Bat memory bat = Bat(_name, _dna);
        bats.push(bat) ;
        uint id = bats.length - 1;
        emit NewBat(id, _name, _dna);
        batToOwner[id] = msg.sender;
        ownerBatCount[msg.sender]++;
    }

    function _generateRandomDna(string memory _str) private view returns (uint)     {
        //console.log("En _generateRandomDna");
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function crearRandomBat(string memory _name) public  {
        //console.log("En crearRandomBat");
        require( ownerBatCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        _crearBat(_name, randDna);
    }

}
