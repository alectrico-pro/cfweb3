///Emision de Batería de recarga
// SPDX-License-Identifier: UNLINCESED
// Autor: alectrico.eth

pragma solidity ^0.8.0;

contract BatteryFactory {

    event NewBat(uint batId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    uint256 public priceToMint = 7000000000000000;

    address public alectrico = 0xf9f84a5b6889273890ef18C2694eEd446320aec6;

    struct Bat 
    {
        string name;
        uint   dna;
    }

    Bat[] public bats;

    mapping( uint => address ) public batToOwner;
    mapping( address => uint ) ownerBatCount;

    function cuantasBateriasHay() public view returns (uint)  {
        return ownerBatCount[ msg.sender ];
    }

    function _crearBat(string memory _name, uint _dna) internal {
        Bat memory bat = Bat(_name, _dna);
        bats.push(bat) ;
        uint id = bats.length - 1;
        emit NewBat(id, _name, _dna);
        batToOwner[id] = msg.sender;
        ownerBatCount[msg.sender]++;
    }

    function _generateRandomDna(string memory _str) private view returns (uint)     {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function crearRandomBat(string memory _name) payable public  {
        require(msg.value == priceToMint && msg.value > 0, "" );
        require( ownerBatCount[msg.sender] == 0);       
        (bool sent, ) = alectrico.call{value: 6300000000000000}("");
        uint randDna = _generateRandomDna(_name);
        _crearBat(_name, randDna);
    }

}
