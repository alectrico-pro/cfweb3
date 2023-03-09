///Emision de Batería de recarga
// SPDX-License-Identifier: UNLINCESED
// Autor: alectrico.eth

import "hardhat/console.sol";

pragma solidity ^0.8.9;

contract BatteryFactory {

    event NewBat(uint batId, string name, uint dna);

    event LogDepositReceived( address sender );

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
        console.log("En cuantasBateriasHay");
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
        bool sent;
        require(msg.value == priceToMint, "pay to mint" );
        (sent, ) = alectrico.call{value: 6300000000000000}("");
        uint randDna = _generateRandomDna(_name);
        _crearBat(_name, randDna);
    }

    fallback() external payable {
       require(msg.data.length == 0 || msg.value == priceToMint, "pay to mint");
       emit LogDepositReceived(msg.sender);
    }
}
