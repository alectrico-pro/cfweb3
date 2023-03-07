// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '@openzeppelin/contracts/utils/Counters.sol';

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

    bool lock = false;
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public constant MAX_TOKENS = 64;
    uint256 public priceToMint;

    bool public hasSaleStarted = false;
    string baseURI;

    event Minted(uint256 tokenId, address owner);
    event Redeemed(uint256 tokenId);

    constructor()
        ERC721PresetMinterPauserAutoId(
            "TokenBat",
            "TokenBat",
            "https://nft.alectrico.workers.dev/"
        )      
    { }

    function withdrawBalance() public onlyOwner returns (bool) {
        require(!lock, 'Reentrancy Detected');
        lock = true;
        uint toWithdraw = (address(this).balance - ((address(this).balance * 10) / 100));
        (bool sent, ) = owner().call{value: toWithdraw}("");
        require(sent, "Transaction failed");
        lock = false;
        return sent;
    }

    function setPriceToMint(uint256 _priceToMint) public onlyOwner  {
       require(msg.sender == owner(), "only owner can set price to mit");
       require(_priceToMint > 0, 'priceToMint has to be positive' );
       priceToMint = _priceToMint;
    }

    function mintToken( address receiver) public payable {
        require(hasSaleStarted || msg.sender == owner(), "sale hasn't started");
        require(
            totalSupply().add(1) <= MAX_TOKENS || msg.sender == owner(),
            "sold out"
        );
        require(msg.value == priceToMint && msg.value > 0, "pay to mint" );
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(receiver, tokenId);
        _tokenIdCounter.increment();
        emit Minted(tokenId, receiver);
    }

    function redeemToken(uint256 tokenId) public {
        require(_exists(tokenId), "token does not exists");
        require( ownerOf(tokenId) == msg.sender,"you don't owned this token");
        //uint256 clientToRedeem = _clientToRedeem.current();
        //_clientToRedeem.increment();
        _burn(tokenId);
        emit Redeemed(tokenId);
        //_client = clientData[clientToRedeem];
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
