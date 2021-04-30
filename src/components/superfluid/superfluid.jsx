import React, { useCallback } from 'react';
import { useWeb3 } from '@openzeppelin/network/react';
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Web3 = require("web3");

export default function Superfluid() {

const sf = new SuperfluidSDK.Framework({
    web3: new Web3(window.ethereum),
});
sf.initialize()

const walletAddress = window.ethereum.request({
    method: 'eth_requestAccounts',
    params: [
      {
        eth_accounts: {}
      }
    ]
});

const carol = sf.user({
    address: walletAddress[0],
    token: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00'
});

const details = carol.details();
console.log(details);

}