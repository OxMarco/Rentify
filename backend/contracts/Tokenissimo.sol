// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/utils/Counters.sol";

import '../interfaces/aToken.sol';
import '../interfaces/LendingPool.sol';

contract Tokenissimo is ERC721, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    // Token
    Counters.Counter private _tokenIds;
    mapping (uint256 => uint256) collaterals;
    mapping (uint256 => address) tenant;

    // Aave
    IERC20 public weth = IERC20(0xd0A1E359811322d97991E03f863a0C30C2cF029C);
    IaToken public aToken = IaToken(0x87b1f4cf9BD63f7BBD3eE1aD04E8F52540349347);
    IAaveLendingPool public aaveLendingPool = IAaveLendingPool(0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe);

    constructor() ERC721("Tokenissimo", "TKN") {
        weth.approve(address(aaveLendingPool), type(uint256).max);
    }

    /**
     * @dev Creates a listing by minting the token.
     * @param receiver Address of the token owner (landlord).
     * @param metadata The IPFS CID where metadata is stored
     * @param collateral The collateral required as safe deposit.
     * @return The id of the new token.
     */
    function mintIt(address receiver, string memory metadata, uint256 collateral) external onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(receiver, tokenId); // use _safeMint?
        _setTokenURI(tokenId, metadata);

        collaterals[tokenId] = collateral;

        return tokenId;
    }

    /**
     * @dev Removes a listing by burning the token.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     * @param addr Address of the token owner (landlord).
     */
    function burnIt(uint256 tokenId, address addr) external {
        require(ownerOf(tokenId) == addr, "Only the owner can burn it");
        require(tenant[tokenId] == address(0), "The property is currently rented");

        _burn(tokenId);
    }
    
    /**
     * @dev Creates a new rental contract linked to the token and deposits collateral in Aave.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     * @param addr Address of the tenant.
     */
    function startRent(uint256 tokenId, address addr) external {
        require(_exists(tokenId), "Query for nonexistent token");
        require(tenant[tokenId] == address(0), "Already rented");
        require(addr != ownerOf(tokenId), "The landlord cannot rent their own property");
        
        require(weth.transferFrom(msg.sender, address(this), collaterals[tokenId]), "WETH Transfer failed!");
        aaveLendingPool.deposit(address(weth), collaterals[tokenId], 0);

        rentee[tokenId] = addr;
    }
    
    /**
     * @dev Closes the rental contract and refunds the deposited collateral to the tenant.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     * @param addr Address of the tenant or the landlord.
     */
    function stopRent(uint256 tokenId, address addr) external {
        require(_exists(tokenId), "Query for nonexistent token");
        require(tenant[tokenId] != address(0), "Not rented");
        require(tenant[tokenId] == addr || ownerOf(tokenId) == addr, "Only the landlord or the tenant can void it");

        aToken.redeem(collaterals[tokenId]);
        require(weth.transferFrom(address(this), msg.sender, collaterals[tokenId]), "WETH Transfer failed!");

        delete rentee[tokenId];
    }
    
    /**
     * @dev Returns the collateral linked to the token.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     */
    function tokenCollateral(uint256 tokenId) external view returns(uint256) {
        require(_exists(tokenId), "Query for nonexistent token");
        
        return collaterals[tokenId];
    }
    
    /**
     * @dev Returns the address of the tenant (or null) of the token.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     */
    function tokenTenant(uint256 tokenId) external view returns(address) {
        require(_exists(tokenId), "Query for nonexistent token");

        return tenant[tokenId];
    }
    
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}
    
    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

