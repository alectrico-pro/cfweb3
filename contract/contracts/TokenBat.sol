/**
 *Submitted for verification at Etherscan.io on 2021-08-27
 */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./SendEther.sol";

/**
 * https://github.com/maticnetwork/pos-portal/blob/master/contracts/common/ContextMixin.sol
 */
abstract contract ContextMixin {
    function msgSender() internal view returns (address payable sender) {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
                sender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            sender = payable(msg.sender);
        }
        return sender;
    }
}

contract TokenBat is ERC721PresetMinterPauserAutoId, Ownable, ContextMixin {

    using SafeMath for uint256;

    uint256 public constant MAX_TOKENS = 64;
    uint256 public priceToMint;

    bool public hasSaleStarted = false;
    string baseURI;

    event Minted(uint256 tokenId, address owner);
    event Redeemed(uint256 tokenId, address owner);


    constructor()
        ERC721PresetMinterPauserAutoId(
            "TokenBat",
            "TokenBat",
            "https://nft.alectrico.workers.dev/"
        )
        
    { }

    function setPriceToMint(uint256 _priceToMint) public onlyOwner  {
       require(msg.sender == owner(), "only owner can set price to mit");
       require(_priceToMint > 0, 'price positive pls' );
       priceToMint = _priceToMint;
    }

    function mintToken(uint256 quantity, address receiver) public payable {
        require(hasSaleStarted || msg.sender == owner(), "sale hasn't started");
        require(quantity > 0, "quantity cannot be zero");
        require(quantity <= 3, "exceeds 3");
        require(
            totalSupply().add(quantity) <= MAX_TOKENS || msg.sender == owner(),
            "sold out"
        );
        require(msg.value == priceToMint && msg.value > 0, "pay to mint" );

        for (uint256 i = 0; i < quantity; i++) {
            uint256 mintIndex = totalSupply();
            _safeMint(receiver, mintIndex);
            emit Minted(mintIndex, receiver);
        }
    }


    function redeemToken(uint256 _tokenId, address receiver) public {
        console.log("En redeemToken");
        console.log("Token_id");
        console.log(_tokenId);
        emit Redeemed(_tokenId, receiver);
    }


    function startSale() public onlyOwner {
        hasSaleStarted = true;
    }

    function pauseSale() public onlyOwner {
        hasSaleStarted = false;
    }

    function tokenExists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    function hasSoldOut() public view returns (bool) {
        if (totalSupply() >= MAX_TOKENS) {
            return true;
        } else {
            return false;
        }
    }

    function isApprovedForAll(address _owner, address _operator)
        public
        view
        override
        returns (bool isOperator)
    {
        // if OpenSea's ERC721 Proxy Address is detected, auto-return true
        if (_operator == address(0x58807baD0B376efc12F5AD86aAc70E78ed67deaE)) {
            return true;
        }

        // otherwise, use the default ERC721.isApprovedForAll()
        return ERC721.isApprovedForAll(_owner, _operator);
    }

    /**
     * This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
     */
    function _msgSender() internal view override returns (address sender) {
        return ContextMixin.msgSender();
    }
}
