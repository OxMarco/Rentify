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
    mapping (uint256 => address) tenant;

    // Aave
    address constant private TOKEN_CONTRACT = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address constant private ATOKEN_CONTRACT = 0xD483B49F2d55D2c53D32bE6efF735cB001880F79;
    address constant private LENDING_POOL_CONTRACT = 0x580D4Fdc4BF8f9b5ae2fb9225D584fED4AD5375c;
    address constant private LENDING_POOL_CORE_CONTRACT = 0x95D1189Ed88B380E319dF73fF00E479fcc4CFa45;
    LendingPool constant private _lendingPool = LendingPool(LENDING_POOL_CONTRACT);

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
        require(tenant[tokenId] == address(0), "The property is currently rented");

        _burn(tokenId);
    }
    
    function startRent(uint256 tokenId, address addr) external payable {
        require(_exists(tokenId), "Query for nonexistent token");
        require(tenant[tokenId] == address(0), "Already rented");
        require(addr != ownerOf(tokenId), "The landlord cannot rent their own property");
        
/*
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
*/

        tenant[tokenId] = addr;
    }
    
    function stopRent(uint256 tokenId, address addr) external {
        require(_exists(tokenId), "Query for nonexistent token");
        require(tenant[tokenId] != address(0), "Not rented");
        require(tenant[tokenId] == addr || ownerOf(tokenId) == addr, "Only the landlord or the tenant can void it");

    /*
        AToken aToken = AToken(ATOKEN_CONTRACT);
        aToken.redeem(collaterals[tokenId]);
    */

        delete tenant[tokenId];
    }
    
    function tokenCollateral(uint256 tokenId) external view returns(uint256) {
        require(_exists(tokenId), "Query for nonexistent token");
        
        return collaterals[tokenId];
    }
    
    /**
     * @dev Returns the address of the tenant (or null) of the token.
     * @param tokenId The id of the token. Must exist otherwise the transaction will fail.
     */
    function tokenRentee(uint256 tokenId) external view returns(address) {
        require(_exists(tokenId), "Query for nonexistent token");

        return tenant[tokenId];
    }

    function getAtokenBalance() external view returns (uint256) {
        AToken aToken = AToken(ATOKEN_CONTRACT);
        uint256 balance = aToken.balanceOf(address(this));
        return balance;
    }
    
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}
    
    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

