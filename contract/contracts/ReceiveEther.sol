// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ReceiveEther {
    receive() external payable {}

    function getBalance() public view returns(uint){
        return address(this).balance;
    }
}
