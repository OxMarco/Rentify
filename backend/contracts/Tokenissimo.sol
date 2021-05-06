// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/utils/Counters.sol";
import "./interfaces/LendingPool.sol";
import "./interfaces/aTokens.sol";

contract Tokenissimo is ERC721, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping (uint256 => uint256) collaterals;
    mapping (uint256 => address) rentee;

    // Aave
    address constant private TOKEN_CONTRACT = 0xD483B49F2d55D2c53D32bE6efF735cB001880F79;
    address constant private ATOKEN_CONTRACT = 0xD483B49F2d55D2c53D32bE6efF735cB001880F79;
    address constant private LENDING_POOL_CONTRACT = 0x580D4Fdc4BF8f9b5ae2fb9225D584fED4AD5375c;
    address constant private LENDING_POOL_CORE_CONTRACT = 0x95D1189Ed88B380E319dF73fF00E479fcc4CFa45;
    LendingPool constant private _lendingPool = LendingPool(LENDING_POOL_CONTRACT);

    constructor() ERC721("Tokenissimo", "TKN") {
    }

    /**
     * @dev Creates a token and the listing associated with it
     * @param receiver The address of the requester. Will become the owner.
     * @param metadata A pointer to the IPFS metadata file
     * @param collateral The amount in wei required to create a rental agreement
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
     * @dev Removes the token and the listing associated with it
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     * @param addr The address of the requester. Must be the owner.
     */
    function burnIt(uint256 tokenId, address addr) external {
        require(owner() == addr, "Only the owner can burn it");
        require(rentee[tokenId] == address(0), "The property is currently rented");

        _burn(tokenId);
    }
    
    /** 
     * @dev Creates a rental agreement and sends collateral to the Aave protocol.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     * @param addr The address of the person asking to create a rental agreement. 
                   Cannot be the landlord.
     */
    function rentIt(uint256 tokenId, address addr) external payable {
        require(_exists(tokenId), "Query for nonexistent token");
        require(rentee[tokenId] == address(0), "Already rented");
        require(addr != owner(), "The landlord cannot rent their own property");
        
        // approve
        IERC20 token = IERC20(TOKEN_CONTRACT);
        uint256 allowance = token.allowance(address(this), LENDING_POOL_CORE_CONTRACT);
        if (allowance != collaterals[tokenId]) {
            if (allowance > 0) 
                token.approve(LENDING_POOL_CORE_CONTRACT, 0);
            else
                token.approve(LENDING_POOL_CORE_CONTRACT, collaterals[tokenId]);
        }

        // deposit
        _lendingPool.deposit(TOKEN_CONTRACT, collaterals[tokenId], 0);

        rentee[tokenId] = addr;
    }
    
    /** 
     * @dev Cancels a rental agreement and sends collateral back to the owner.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     * @param addr The address of the person asking to cancel the rental agreement. 
                   Must be either the landlord or the tenant.
     */
    function unrentIt(uint256 tokenId, address addr) external {
        require(_exists(tokenId), "Query for nonexistent token");
        require(rentee[tokenId] != address(0), "Not rented");
        require(rentee[tokenId] == addr || owner() == addr, "Only the landlord or the rentee can void it");

        AToken aToken = AToken(ATOKEN_CONTRACT);
        aToken.redeem(collaterals[tokenId]);

        delete rentee[tokenId];
    }
    
    /**
     * @dev Returns the collateral deposit related to a certain listing
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     */
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
