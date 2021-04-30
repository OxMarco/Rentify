import React, { Component, useState } from 'react';
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import './floating.css';

export default class TorusLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: false
        };
    }

    requestAccess = async (e) => {
        e.preventDefault();
    
        const torus = new Torus({});
        await torus.init({
          enableLogging: false,
        });
        await torus.login();
    
        const web3 = new Web3(torus.provider);
        const address = (await web3.eth.getAccounts())[0];
        const balance = await web3.eth.getBalance(address);
        console.log({ address, balance });
        this.setState({logged_in: true});
    };

    render() {
        return (
            <div className="tooltip-container" style={{display: this.state.logged_in ? 'none' : 'block' }}>
                <button onClick={this.requestAccess} className="floating-icon-float" id="btn-connect">
                    <i className="fab fa-ethereum my-float">
                        <span className="tooltip">Sign in with your wallet</span>
                    </i>
                </button>
            </div>
        );
    }
}