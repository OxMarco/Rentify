import React from 'react';
import { Link } from "react-router-dom";

function Footer({classProp}) {
        return (
            <footer className={classProp}>
                <div className="row">
                    <div className="col-12 col-md">
                        <img className="mb-2" src="https://i.ibb.co/ZX6zXDC/house.png" alt="logo" width="50" height="50" />
                        <small className="d-block mb-3 text-muted">Rentify</small>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Sponsors</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="https://www.superfluid.finance/">Superfluid</a></li>
                            <li><a className="text-muted" href="https://tor.us/">Torus</a></li>
                            <li><a className="text-muted" href="https://aave.com/">Aave</a></li>
                            <li><a className="text-muted" href="https://matic.network/">Matic</a></li>
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
                            <li><a className="text-muted" href="https://github.com/">...</a></li>
                            <li><a className="text-muted" href="https://github.com/">...</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
}

export default React.memo(Footer)
