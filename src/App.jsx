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
            userInfo: '',
            address: '',
            web3: null,
            api: null
        };
    }

    async componentDidMount() {
        const torus = new Torus({});
        await torus.init({
            enableLogging: false,
        });
        await torus.setProvider({
            host: 'kovan',
        });

        await torus.login();

        const web3 = new Web3(torus.provider);
        const address = (await web3.eth.getAccounts())[0];
        const userInfo = await torus.getUserInfo();

        const api = new Api(web3, address);

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
