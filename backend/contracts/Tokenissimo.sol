// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/utils/Counters.sol";

contract Tokenissimo is ERC721, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping (uint256 => uint256) collaterals;
    mapping (uint256 => address) rentee;

    constructor() ERC721("Tokenissimo", "TKN") {
    }

    function mintIt(address receiver, string memory metadata, uint256 collateral) external onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(receiver, tokenId); // use _safeMint?
        _setTokenURI(tokenId, metadata);

        collaterals[tokenId] = collateral;

        return tokenId;
    }

    function burnIt(uint256 tokenId, address addr) external {
        require(ownerOf(tokenId) == addr, "Only the owner can burn it");
        require(rentee[tokenId] == address(0), "The property is currently rented");

        _burn(tokenId);
    }
    
    function rentIt(uint256 tokenId, address addr) external payable {
        require(_exists(tokenId), "Query for nonexistent token");
        require(rentee[tokenId] == address(0), "Already rented");
        require(addr != ownerOf(tokenId), "The landlord cannot rent their own property");
        
        rentee[tokenId] = addr;
    }
    
    function unrentIt(uint256 tokenId, address addr) external {
        require(_exists(tokenId), "Query for nonexistent token");
        require(rentee[tokenId] != address(0), "Not rented");
        require(rentee[tokenId] == addr || ownerOf(tokenId) == addr, "Only the landlord or the rentee can void it");

        delete rentee[tokenId];
    }
    
    function tokenCollateral(uint256 tokenId) external view returns(uint256) {
        require(_exists(tokenId), "Query for nonexistent token");
        
        return collaterals[tokenId];
    }
    
    /**
     * @dev Returns the address of the rentee (or null) of the token.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     */
    function tokenRentee(uint256 tokenId) external view returns(address) {
        require(_exists(tokenId), "Query for nonexistent token");

        return rentee[tokenId];
    }
    
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}
    
    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

