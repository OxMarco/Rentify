import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Footer extends Component {

    render() {
        return (
            <footer className="dark-footer skin-dark-footer">
                <div>
                    <div className="container">
                        <div className="row">
                            
                            <div className="col-5">
                                <div className="footer-widget">
                                    <img src="https://kumarpreet.com/travlio-live/travlio/assets/img/logo-light.png" className="img-footer" alt="" />
                                    <div className="footer-add">
                                        <p><strong>Email:</strong><br /><a href="mailto:hello@rentify.ens">hello@rentify.ens</a></p>
                                        <p><strong>Contract Address:</strong><br /><a href="https://goerli.etherscan.io/address/0xEaD45163607196fC7aDEfB614D6556B9d392ADf2">goerli</a></p>
                                    </div>
                                    
                                </div>
                            </div>		

                            <div className="col">
                                <div className="footer-widget">
                                    <h4 className="widget-title">Navigation</h4>
                                    <ul className="footer-menu">
                                        <li><Link to="/">Homepage</Link></li>
                                        <li><Link to="/dashboard">Dashboard</Link></li>
                                        <li><Link to="/rent">Browse all properties</Link></li>
                                        <li><Link to="/let">Rent a property</Link></li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="col">
                                <div className="footer-widget">
                                    <h4 className="widget-title">Sponsors</h4>
                                    <ul className="footer-menu">
                                        <li><a href="https://superfluid.finance/">SuperFluid</a></li>
                                        <li><a href="https://tor.us/">Torus</a></li>
                                        <li><a href="https://aave.com/">Aave</a></li>
                                        <li><a href="https://ipfs.io/">IPFS</a></li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row align-items-center">
                            
                            <div className="col-lg-6 col-md-6">
                                <p className="mb-0">Made for Scaling Ethereum Hack - April/May 2021</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
