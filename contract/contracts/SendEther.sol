// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract SendEther {
    bool lock = false;
    function sendEther (address payable _to, uint256 _priceToPay) public payable returns(bool){
        require(!lock, 'Reentrancy Detected');
        lock = true;        
        (bool sent, ) = _to.call{value: _priceToPay}("");
        require(sent, "Payment Failed");
        lock = false;
        return sent;
    }

    function withdrawEther (address payable _to, uint256 _amount) public payable returns(bool){
        require(!lock, 'Reentrancy Detected');
        lock = true;        
        (bool sent, ) = _to.call{value: _amount}("");
        require(sent, "Transaccion failed");
        lock = false;
        return sent;
    }
}
