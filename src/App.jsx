import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import Gallery from './pages/gallery/gallery';
import Info from './pages/info/info';
import Sell from './pages/sell/sell';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(walletAddress) {
        this.setState({address: walletAddress});
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/sell" render={(_props) => <Sell address={this.state.address} onLogin={this.handleLogin} />} />
                    <Route exact path="/gallery" render={(_props) => <Gallery address={this.state.address} onLogin={this.handleLogin} />} />
                    <Route exact path="/info/:id" render={(_props) => <Info address={this.state.address} onLogin={this.handleLogin} />} />
                    <Route exact path="/" render={(_props) => <Home address={this.state.address} onLogin={this.handleLogin} />} />
                </Switch>
            </BrowserRouter>
        );
    }
}
