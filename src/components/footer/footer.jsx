import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 col-md">
                    <img className="mb-2" src="https://i.ibb.co/ZX6zXDC/house.png" alt="logo" width="50" height="50" />
                    <small className="d-block mb-3 text-muted">The Fluidifier</small>
                </div>
                <div className="col-6 col-md">
                    <h5>Sponsors</h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="text-muted" href="https://www.superfluid.finance/">Superfluid</a></li>
                        <li><a className="text-muted" href="https://tor.us/">Torus</a></li>
                        <li><a className="text-muted" href="https://skale.network/">Skale</a></li>
                        <li><a className="text-muted" href="https://thegraph.com/">The Graph</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Pages</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className="text-muted" to="/">Home</Link></li>
                        <li><Link className="text-muted" to="/gallery">Gallery</Link></li>
                        <li><Link className="text-muted" to="/sell">Sell</Link></li>
                        <li><Link className="text-muted" to="/about">About</Link></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Team</h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="text-muted" href="https://github.com/matteougolotti">@matxzy</a></li>
                        <li><a className="text-muted" href="https://github.com/grcasanova">@Rene</a></li>
                        <li><a className="text-muted" href="https://github.com/">@schallereth</a></li>
                        <li><a className="text-muted" href="https://github.com/">@holding_in_luxembourg</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
