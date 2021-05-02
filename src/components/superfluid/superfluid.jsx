import React, { useCallback } from 'react';
import Web3 from "web3";

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

export default function Superfluid(wallet) {

  const sf = new SuperfluidSDK.Framework({
      web3: new Web3(window.ethereum),
  });
  sf.initialize()

  const carol = sf.user({
      address: wallet,
      token: '0x59988e47A3503AaFaA0368b9deF095c818Fdca01'
  });

  const details = carol.details();
  console.log(details);

}