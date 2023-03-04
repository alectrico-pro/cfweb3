// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "hardhat/console.sol";


contract SendEther {
    bool lock = false;
    function sendEther (address payable _to, uint256 _priceToPay) public payable returns(bool){
        require(!lock, 'Reentrancy Detected');
        lock = true;       
        require(msg.value == _priceToPay, "El monto del pago no es igual al precio");
        (bool sent, ) = _to.call{value: _priceToPay}("");
        require(sent, "Payment Failed");
        lock = false;
        return sent;
    }

    function withdrawEther (address payable _to, uint256 _amount) public payable returns(bool){
        require(!lock, 'Reentrancy Detected');
        lock = true;        
        require(msg.value == _amount, "El monto del pago no es igual al precio");
        (bool sent, ) = _to.call{value: _amount}("");
        require(sent, "Transaction Failed");
        lock = false;
        return sent;
    }
}
