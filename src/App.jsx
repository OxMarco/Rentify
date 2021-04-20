import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import Gallery from './pages/gallery/gallery';
import Info from './pages/info/info';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/info/:id">
                        <Info />
                    </Route>

                    <Route path="/gallery">
                        <Gallery />
                    </Route>

                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
