// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

import "./Tokenissimo.sol";

contract Rentify {

    Tokenissimo private _tokenFactory;
    
    constructor() {
        _tokenFactory = new Tokenissimo();
    }
    
    function create(string memory metadata, uint256 price, uint256 collateral) public returns (uint256) {
        require(bytes(metadata).length >= 0, "Not a valid CID"); // a IPFS CID is 46 chars long
        
        return _tokenFactory.mintIt(msg.sender, metadata, price, collateral);
    }
    
    function remove(uint256 id) public {
        _tokenFactory.burnIt(id, msg.sender);
    }
    
    function get(uint256 id) public view returns (string memory, uint256, uint256, address, address) {
        return ( _tokenFactory.tokenURI(id), _tokenFactory.tokenPrice(id), _tokenFactory.tokenCollateral(id), _tokenFactory.tokenLandlord(id), _tokenFactory.tokenTenant(id) );
    }

    function getAll() public view returns (uint256) {
        return _tokenFactory.allTokens();
    }
    
    function startRent(uint256 id) public payable {
        require(msg.value == _tokenFactory.tokenCollateral(id), "Insufficient funds sent");
    
        _tokenFactory.startRent(id, msg.sender);
    }
    
    function stopRent(uint256 id) public {
        _tokenFactory.stopRent(id, msg.sender);
    }
}
