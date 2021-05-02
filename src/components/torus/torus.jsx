import React, { Component } from 'react';
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import './torus.css';

export default class TorusLogin extends Component {

    requestAccess = async (e) => {
        e.preventDefault();
    
        const torus = new Torus({});
        await torus.init({
          enableLogging: false,
        });
        await torus.setProvider({
            host: "goerli", // default : 'mainnet'
        });
        await torus.login();
    
        const web3 = new Web3(torus.provider);
        const address = (await web3.eth.getAccounts())[0];
        const userInfo = await torus.getUserInfo();
        console.log(userInfo);
        this.props.login(address);
    };

    render() {
        return (
            <a href="#" onClick={this.requestAccess} className="float" style={{display: this.props.address === '' ? 'block' : 'none' }}>
                <i className="fa fa-wallet my-float"></i>
            </a>
        );
    }
}
