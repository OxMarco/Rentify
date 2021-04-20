import React, { useCallback } from 'react';
import { useWeb3 } from '@openzeppelin/network/react';
import './connector.css';

const infuraProjectId = '95202223388e49f48b423ea50a70e336';

export default function Connector() {
        const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);
        const { networkId, networkName, accounts, providerName } = web3Context;
        var connected = false;
        console.log(networkName);

        const requestAuth = async web3Context => {
            try {
                await web3Context.requestAuth();
            } catch (e) {
                alert('Wallet connection error, please reload and retry');
            }
        };

        const requestAccess = useCallback(() => requestAuth(web3Context), []);

        return (
            <div className="tooltip-container">
                <button onClick={requestAccess} className="floating-icon-float" id="btn-connect">
                    <i className="fab fa-ethereum my-float">
                        <span className="tooltip">Sign in with your wallet</span>
                    </i>
                </button>
            </div>
        );
}
