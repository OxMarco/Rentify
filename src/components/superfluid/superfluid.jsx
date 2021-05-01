import React, { useCallback } from 'react';
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Web3 = require("web3");

export default function Superfluid(wallet) {

  const sf = new SuperfluidSDK.Framework({
      web3: new Web3(window.ethereum),
  });
  sf.initialize()

  const carol = sf.user({
      address: wallet,
      token: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00'
  });

  const details = carol.details();
  console.log(details);

}