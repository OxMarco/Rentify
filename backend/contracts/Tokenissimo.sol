// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/utils/Counters.sol";

contract Tokenissimo is ERC721, ERC721Burnable {
    using Counters for Counters.Counter;

    // Token
    Counters.Counter private _tokenIds;
    mapping (uint256 => uint256) prices;
    mapping (uint256 => uint256) collaterals;
    mapping (uint256 => address) tenants;

    constructor() ERC721("Tokenissimo", "TKN") {}

    /**
     * @dev Creates a listing by minting the token.
     * @param receiver Address of the token owner (landlord).
     * @param metadata The IPFS CID where metadata is stored
     * @param collateral The collateral required as safe deposit.
     */
    function mintIt(address receiver, string memory metadata, uint256 price, uint256 collateral) external returns (uint256) {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(receiver, tokenId); // use _safeMint?
        _setTokenURI(tokenId, metadata);

        prices[tokenId] = price;
        collaterals[tokenId] = collateral;

        return tokenId;
    }

    /**
     * @dev Removes a listing by burning the token.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     * @param addr Address of the token owner (landlord).
     */
    function burnIt(uint256 tokenId, address addr) external {
        require(_exists(tokenId), "Query for nonexistent token");
        require(ownerOf(tokenId) == addr, "Only the owner can burn it");
        require(tenants[tokenId] == address(0), "The property is currently rented");

        _burn(tokenId);
    }
    
    /**
     * @dev Creates a new rental contract linked to the token and deposits collateral in Aave.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     * @param addr Address of the tenant.
     */
    function startRent(uint256 tokenId, address addr) external {
        require(_exists(tokenId), "Query for nonexistent token");
        require(tenants[tokenId] == address(0), "Already rented");
        require(addr != ownerOf(tokenId), "The landlord cannot rent their own property");

        tenants[tokenId] = addr;
    }
    
    /**
     * @dev Closes the rental contract and refunds the deposited collateral to the tenant.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     * @param addr Address of the tenant or the landlord.
     */
    function stopRent(uint256 tokenId, address addr) external {
        require(_exists(tokenId), "Query for nonexistent token");
        require(tenants[tokenId] != address(0), "Not rented");
        require(tenants[tokenId] == addr || ownerOf(tokenId) == addr, "Only the landlord or the tenant can void it");

        delete tenants[tokenId];
    }
    
    /**
     * @dev Returns the collateral linked to the token.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     */
    function tokenCollateral(uint256 tokenId) external view returns(uint256) {        
        return collaterals[tokenId];
    }

    /**
     * @dev Returns the price linked to the token.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     */
    function tokenPrice(uint256 tokenId) external view returns(uint256) {        
        return prices[tokenId];
    }
    
    /**
     * @dev Returns the address of the landlord (or null) of the token.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     */
    function tokenLandlord(uint256 tokenId) external view returns(address) {        
        return ownerOf(tokenId);
    }

    /**
     * @dev Returns the address of the tenant (or null) of the token.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     */
    function tokenTenant(uint256 tokenId) external view returns(address) {        
        return tenants[tokenId];
    }

    /**
     * @dev Returns the token counter.
     */
    function allTokens() external view returns (uint256) {
        return _tokenIds.current();
    }
}
