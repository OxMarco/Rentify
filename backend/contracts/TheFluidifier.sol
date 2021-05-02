// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.7.0;

contract TheFluidifier {

    struct Listing {
        string metadata;
        uint256 collateral;
    }

    mapping(address => Listing[]) private items;

    function getAll() public view returns(mapping(address => Listing[])) {
        return items;
    }

    function getOwn() public view returns(Listing[] memory) {
        return items[msg.sender];
    }

    function add(string memory metadata, uint256 collateral) public {
        items[msg.sender].push(Listing(metadata, collateral));
    }

    function remove(string metadata) public {
        ???
    }
}
