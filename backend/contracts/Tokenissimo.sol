// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC721/ERC721Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/utils/Counters.sol";

contract Tokenissimo is ERC721, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping (uint256 => uint256) collaterals;
    mapping (uint256 => address) rentee;

    // Aave
    address constant private LENDING_POOL_CONTRACT = 0x580D4Fdc4BF8f9b5ae2fb9225D584fED4AD5375c;
    LendingPool constant private _lendingPool = LendingPool(LENDING_POOL_CONTRACT);
    address constant private LENDING_POOL_CORE_CONTRACT = 0x95D1189Ed88B380E319dF73fF00E479fcc4CFa45;

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
        require(owner() == addr, "Only the owner can burn it");
        require(rentee[tokenId] == address(0), "The property is currently rented");

        _burn(tokenId);
    }
    
    function rentIt(uint256 tokenId, address addr) external payable {
        require(_exists(tokenId), "Query for nonexistent token");
        require(rentee[tokenId] == address(0), "Already rented");
        require(addr != owner(), "The landlord cannot rent their own property");
        
        rentee[tokenId] = addr;
    }
    
    function unrentIt(uint256 tokenId, address addr) external {
        require(_exists(tokenId), "Query for nonexistent token");
        require(rentee[tokenId] != address(0), "Not rented");
        require(rentee[tokenId] == addr || owner() == addr, "Only the landlord or the rentee can void it");

        (bool sent, bytes memory data) = payable(rentee[tokenId]).call{value: collaterals[tokenId]}("");
        require(sent, "Failed to redeem collateral");

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

    /**
     * @dev Returns a token's aToken contract address given its ERC20 contract address. Made for Kovan
     * @param erc20Contract The ERC20 contract address of the token.
     */
    function getATokenContract(address erc20Contract) private pure returns (address) {
        if (erc20Contract == 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa) return 0x58AD4cB396411B691A9AAb6F74545b2C5217FE6a; // DAI => aDAI
        else revert("Supported Aave aToken address not found for this token address.");
    }

    /**
     * @dev Returns the fund's balance of the specified currency in the Aave pool.
     * @param erc20Contract The ERC20 contract address of the token.
     */
    function getBalance(address erc20Contract) external view returns (uint256) {
        AToken aToken = AToken(getATokenContract(erc20Contract));
        return aToken.balanceOf(address(this));
    }

    /**
     * @dev Approves tokens to Aave without spending gas on every deposit.
     * @param erc20Contract The ERC20 contract address of the token.
     * @param amount Amount of the specified token to approve to Aave.
     */
    function approve(address erc20Contract, uint256 amount) external {
        IERC20 token = IERC20(erc20Contract);
        uint256 allowance = token.allowance(address(this), LENDING_POOL_CORE_CONTRACT);
        if (allowance == amount) return;
        if (amount > 0 && allowance > 0) token.safeApprove(LENDING_POOL_CORE_CONTRACT, 0);
        token.safeApprove(LENDING_POOL_CORE_CONTRACT, amount);
        return;
    }

    /**
     * @dev Deposits funds to the Aave pool. Assumes that you have already approved >= the amount to Aave.
     * @param erc20Contract The ERC20 contract address of the token to be deposited.
     * @param amount The amount of tokens to be deposited.
     * @param referralCode Referral code.
     */
    function deposit(address erc20Contract, uint256 amount, uint16 referralCode) external {
        require(amount > 0, "Amount must be greater than 0.");
        _lendingPool.deposit(erc20Contract, amount, referralCode);
    }

    /**
     * @dev Withdraws funds from the Aave pool.
     * @param erc20Contract The ERC20 contract address of the token to be withdrawn.
     * @param amount The amount of tokens to be withdrawn.
     */
    function withdraw(address erc20Contract, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0.");
        AToken aToken = AToken(getATokenContract(erc20Contract));
        aToken.redeem(amount);
    }

    /**
     * @dev Withdraws all funds from the Aave pool.
     * @param erc20Contract The ERC20 contract address of the token to be withdrawn.
     * @return Boolean indicating success.
     */
    function withdrawAll(address erc20Contract) external returns (bool) {
        AToken aToken = AToken(getATokenContract(erc20Contract));
        uint256 balance = aToken.balanceOf(address(this));
        if (balance <= 0) return false;
        aToken.redeem(balance);
        return true;
    }
}
