// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/utils/Counters.sol";
import "./ceth.sol";

contract Tokenissimo is ERC721, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping (uint256 => uint256) collaterals;
    mapping (uint256 => address) rentee;
    address payable private _cEtherContract;

    constructor() ERC721("Tokenissimo", "TKN") {
        _cEtherContract = 0x41B5844f4680a8C38fBb695b7F9CFd1F64474a72; // Compound ETH gateway on Goerli
    }

    function mintIt(address receiver, string memory metadata, uint256 collateral) external onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(receiver, tokenId);
        _setTokenURI(tokenId, metadata);

        collaterals[tokenId] = collateral;

        return tokenId;
    }

    function burnIt(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }
    
    function rentIt(uint256 tokenId, address addr) external payable onlyOwner {
        require(_exists(tokenId), "Query for nonexistent token");
        require(rentee[tokenId] == address(0), "Already rented");

        CEth cToken = CEth(_cEtherContract);
        cToken.mint{ value:msg.value, gas:250000 };
        
        rentee[tokenId] = addr;
    }
    
    function unrentIt(uint256 tokenId, address addr) external onlyOwner {
        require(_exists(tokenId), "Query for nonexistent token");
        require(rentee[tokenId] != address(0), "Not rented");
        require(rentee[tokenId] == addr, "Only the rentee can void it");
        
        CEth cToken = CEth(_cEtherContract);
        uint256 redeemResult = cToken.redeemUnderlying(collaterals[tokenId]);
        require(redeemResult != 0, "Collateral redeem error");
        
        delete rentee[tokenId];
    }
    
    function tokenCollateral(uint256 tokenId) external view returns(uint256) {
        require(_exists(tokenId), "Query for nonexistent token");
        
        return collaterals[tokenId];
    }
    
    function tokenRentee(uint256 tokenId) external view returns(address) {
        require(_exists(tokenId), "Query for nonexistent token");

        return rentee[tokenId];
    }
}
