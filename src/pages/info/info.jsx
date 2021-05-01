import React, { Component } from 'react';
import TorusLogin from '../../components/torus/torus';
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Web3 = require("web3");

export default class Info extends Component {
    buy(id) {
        if(this.props.address === '') {
            alert('login first');
            return;
        }

        const sf = new SuperfluidSDK.Framework({
            web3: new Web3(window.ethereum),
        });
        sf.initialize()

        const sfUser = sf.user({
            address: this.props.address,
            token: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00'
        });

        const details = sfUser.details();
        console.log(details);
    }

    render() {
        return (
        <>
            <div>
                <h2>Category</h2>
                <img src="" />
                <h1>title</h1>
                <p>body</p>
                <p>$100</p>
                <ul>
                    <li>aaa</li>
                    <li>bbb</li>
                </ul>
                <button onClick={() => this.buy(1)}>Buy Now</button>
            </div>

            <TorusLogin login={this.props.onLogin} address={this.props.address} />
        </>
        );
    }
}