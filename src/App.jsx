import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

import Home from './pages/home/home';
import Gallery from './pages/gallery/gallery';
import Info from './pages/info/info';
import Sell from './pages/sell/sell';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            web3: null,
        };

        this.login = this.login.bind(this);
    }

    async login() {
        const torus = new Torus({});
        await torus.init({
            enableLogging: false,
        });
        await torus.setProvider({
            host: 'goerli',
        });

        await torus.login();

        const web3 = new Web3(torus.provider);
        const address = (await web3.eth.getAccounts())[0];

        const userInfo = await torus.getUserInfo();
        console.log(userInfo);

        this.setState({
            address: address,
            web3: web3,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/sell" render={(_props) => <Sell address={this.state.address} login={this.login} />} />
                    <Route exact path="/gallery" render={(_props) => <Gallery address={this.state.address} login={this.login} />} />
                    <Route exact path="/info/:id" render={(_props) => <Info address={this.state.address} web3={this.state.web3} login={this.login} />} />
                    <Route exact path="/" render={(_props) => <Home address={this.state.address} login={this.login} />} />
                </Switch>
            </BrowserRouter>
        );
    }
}
