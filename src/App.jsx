import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import IpfsHttpClient from 'ipfs-http-client';
import IpfsRouter from 'ipfs-react-router'
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

import Error from './pages/error/error';
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Rent from './pages/rent/rent';
import Let from './pages/let/let';
import Info from './pages/info/info';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loader from './components/loader/loader';

import Api from './components/api/api';

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: '',
            address: '',
            web3: null,
            api: null,
            ipfs: null,
            loggedIn: false
        };

        this.ensureLoggedIn = this.ensureLoggedIn.bind(this);
    }

    async init() {
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
        const ipfs = IpfsHttpClient({
            host: "ipfs.infura.io",
            port: "5001",
            protocol: "https",
        });

        const api = new Api(web3, address);

        this.setState({
            userInfo: userInfo,
            address: address,
            web3: web3,
            api: api,
            ipfs: ipfs,
            loggedIn: true
        });
    }

    async ensureLoggedIn() {
        while (!this.state.loggedIn) {
            try {
                await this.init();
            } catch (e) {
                console.error("Login failed: " + e.toString());
            }
        }
    }

    async componentDidMount() {
        await this.ensureLoggedIn();
    }

    render() {
        const { loggedIn } = this.state;

        if(!loggedIn)
            return(
                <Loader />
            );
        else
        return (
            <IpfsRouter>
                <>
                <Header />
                <Switch>
                    <Route exact path="/let" render={(props) => <Let address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} ipfs={this.state.ipfs} {...props} />} />
                    <Route exact path="/rent" render={(props) => <Rent address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} ipfs={this.state.ipfs} {...props} />} />
                    <Route exact path="/dashboard" render={(props) => <Dashboard address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} {...props} />} />
                    <Route exact path="/info/:id" render={(props) => <Info address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} {...props} />} />
                    <Route exact path="/" render={(props) => <Home address={this.state.address} api={this.state.api} />} />
                    <Route render={(props) => <Error />} />
                </Switch>
                <Footer />
                </>
            </IpfsRouter>
        );
    }
}
