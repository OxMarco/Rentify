import React, { Component } from 'react';
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import './floating.css';

export default class TorusLogin extends Component {

    requestAccess = async (e) => {
        e.preventDefault();
    
        const torus = new Torus({});
        await torus.init({
          enableLogging: false,
        });
        await torus.login();
    
        const web3 = new Web3(torus.provider);
        const address = (await web3.eth.getAccounts())[0];

        this.props.login(address);
    };

    render() {
        return (
            <div className="tooltip-container" style={{display: this.props.address === '' ? 'block' : 'none' }}>
                <button onClick={this.requestAccess} className="floating-icon-float" id="btn-connect">
                    <i className="fab fa-ethereum my-float">
                        <span className="tooltip">Sign in with your wallet</span>
                    </i>
                </button>
            </div>
        );
    }
}
