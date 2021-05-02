// SPDX-License-Identifier: Apache-2.0

pragma solidity >=0.7.0 <0.9.0;

import { ILendingPool } from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";

contract TheFluidifier {

    struct Listing {
        uint256 id;
        address owner;
        string metadata;
        uint256 collateral;
    }
    Listing[] private items;

    event refreshItemsList();

    function getAll() public view returns(Listing[] memory) {
        return items;
    }

    function add(string memory metadata, uint256 collateral) public returns(uint256) {
        uint256 id = items.length;
        items.push(Listing(id, msg.sender, metadata, collateral));

        emit refreshItemsList();

        return id;
    }

    function find(uint256 id) public view returns(Listing memory) {
        uint256 i = 0;
        while (i < items.length) {
            if(items[i].id == id) return items[i];
            i++;
        }

        revert('Not Found');
    }

    function remove(uint256 id) public {

        uint256 i = 0;
        while (i < items.length) {
            if(items[i].id == id) {
                require(items[i].owner == msg.sender, 'The owner only can remove the listing');
                delete items[i];

                emit refreshItemsList();

                return;
            }
            i++;
        }
        
        revert('Not Found');
    }

    function buy(uint256 id) public {
        //ILendingPool(pool).deposit(token, amount, user, '0');

    }

}
