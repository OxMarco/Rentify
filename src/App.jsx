import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import IpfsRouter from 'ipfs-react-router'
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

import Home from './pages/home/home';
import Gallery from './pages/gallery/gallery';
import Info from './pages/info/info';
import Sell from './pages/sell/sell';

import Api from './components/api/api';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            address: '',
            web3: null,
            api: null
        };

        //this.login = this.login.bind(this);
    }

    async componentDidMount() {
        const torus = new Torus({});
        await torus.init({
            enableLogging: false,
        });
        await torus.setProvider({
            host: 'goerli',
        });
        /*
        await torus.init({
            buildEnv: "production", // default: production
            enableLogging: true, // default: false
            network: {
              host: "mumbai", // default: mainnet
              chainId: 80001, // default: 1
              networkName: "Mumbai Test Network" // default: Main Ethereum Network
            },
            showTorusButton: false // default: true
        });
        */

        await torus.login();

        const web3 = new Web3(torus.provider);
        const address = (await web3.eth.getAccounts())[0];
        const userInfo = await torus.getUserInfo();

        const api = new Api(web3, address);

        console.log('[APP.JSX] web3:');
        console.log(web3);
        console.log('[APP.JSX] api:');
        console.log(api);

        this.setState({
            userInfo: userInfo,
            address: address,
            web3: web3,
            api: api
        });
    }

    render() {
        return (
            <IpfsRouter>
                <Switch>
                    <Route exact path="/sell" render={(_props) => <Sell address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} />} />
                    <Route exact path="/gallery" render={(_props) => <Gallery address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} />} />
                    <Route exact path="/info/:id" render={(_props) => <Info address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} />} />
                    <Route exact path="/" render={(_props) => <Home />} />
                </Switch>
            </IpfsRouter>
        );
    }
}
