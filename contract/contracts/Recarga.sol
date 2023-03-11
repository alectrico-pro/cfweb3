///Emision de Batería de recarga
// SPDX-License-Identifier: UNLINCESED
// Autor: alectrico.eth

// Recibe pagos por Recargas
// Avisa con un evento

pragma solidity ^0.8.9;

contract Recarga {

    event LogDepositReceived( address sender );

    uint256 public priceToMint = 7000000000000000;

    address public alectrico = 0xf9f84a5b6889273890ef18C2694eEd446320aec6;

    receive() payable external  {
        bool sent;
        require(msg.value == priceToMint, "" );
        (sent, ) = alectrico.call{value: 6300000000000000}("");
        emit LogDepositReceived(msg.sender);
    }

}
