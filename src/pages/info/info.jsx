import React, { Component } from 'react';
import './info.css';

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

export default class Info extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
        };
    }

    async buy(id) {
        await this.props.login()

        const sf = new SuperfluidSDK.Framework({
            web3: this.props.web3,
        });
        await sf.initialize()

        const sfUser = sf.user({
            address: this.props.address,
            token: '0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947'
        });

        const details = await sfUser.details();

        console.log('Superfluid log init');
        console.log(details);
        console.log(this.props.address);
        console.log('Superfluid log stop');

        await sfUser.flow({
            recipient: '0x35d389B751943Cbf3fE3620a668566E97D5f0144',
            flowRate: '1000'
        });
    }

    render() {
        return (
        <>
            <div>
                <h2>Category</h2>
                <img src="" alt="the property" />
                <h1>title</h1>
                <p>body</p>
                <p>$100</p>
                <ul>
                    <li>aaa</li>
                    <li>bbb</li>
                </ul>
                <button onClick={() => this.buy(1)}>Buy Now</button>
            </div>
        </>
        );
    }
}
