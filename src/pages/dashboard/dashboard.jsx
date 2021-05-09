import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DashboardHeader from '../../components/dashboard-header/dashboard-header';

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokens: [],
            userInfo: this.props.userInfo
        };
    }

    async componentDidMount () {
        this.setState({ address: this.props.address });

        const all = await this.props.api.getAll();

        var t = [];
        for(let i = 1; i <= all; i++) {
            try {
                const temp = await this.props.api.get(i);
                t.push(temp);
            } catch (e) {
            }
        }

        this.setState({ tokens: t });
    }

    async remove(token) {
        const all = await this.props.api.remove(token.id);
    }

    async unrent(token) {

        const sf = new SuperfluidSDK.Framework({
            web3: this.props.web3,
        });
        await sf.initialize()

        const owner = sf.user({
            address: token.owner,
            token: '0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947'
        });

        const tenant = sf.user({
            address: token.tenant,
            token: '0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947'
        });

        sf.cfa.deleteFlow({
            superToken: '0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947',
            sender: tenant,
            receiver: owner,
            by: this.state.address,
        });

        this.props.api.leave(token.id);
    }

    render() {
        const { tokens, address, userInfo } = this.state;

        return (
            <>
            <DashboardHeader userInfo={userInfo} />
            
            <section className="gray">
                <div className="container-fluid">
                    <div className="row">
                        
                        <div className="col-lg-3 col-md-4 col-sm-12">
                            <div className="dashboard-navbar">
                                
                                <div className="d-user-avater">
                                    <img src={userInfo.profileImage} className="img-fluid avater" alt="profile image" />
                                    <h4>{userInfo.name}</h4>
                                    <span>Verified via {userInfo.verifier}</span>
                                </div>
                                
                                <div className="d-navigation">
                                    <ul>
                                        <li><a href="#"><i className="fa fa-plus"></i>To Let</a></li>
                                        <li><a href="#"><i className="fa fa-minus"></i>To Rent</a></li>
                                        <li><Link to="/let"><i className="fa fa-edit"></i>Add New</Link></li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <div className="dashboard-wrapers">
                            
                                <div className="dashboard-gravity-list mt-0">
                                    <h4>As Landlord</h4>
                                    <ul>
                                    { tokens && tokens.filter(token => token.landlord === address).map((token) =>
                                        <li>
                                            <div className="list-box-listing">
                                                <div className="list-box-listing-img">
                                                    <a href="#">
                                                    <img src="assets/img/destination/des-2.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="list-box-listing-content">
                                                    <div className="inner">
                                                        <h3><a href="#">{token.title}</a></h3>
                                                        <span>{token.region}, {token.country}</span>
                                                        <div className="star-rating">
                                                            <div className="rating-counter">(10 reviews)</div>
                                                        <span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star empty"></span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="buttons-to-right">
                                                <a href="#" className="button gray"><i className="fa fa-eye"></i> View</a>
                                                <a href="#" onClick={() => this.remove(token)} className="button gray"><i className="fa fa-trash"></i> Delete</a>
                                            </div>
                                        </li>
                                    )}
                                    </ul>

                                    <h4>As Tenant</h4>
                                    <ul>
                                    { tokens && tokens.filter(token => token.tenant === address).map((token) =>
                                        <li>
                                            <div className="list-box-listing">
                                                <div className="list-box-listing-img">
                                                    <a href="#">
                                                    <img src="assets/img/destination/des-2.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="list-box-listing-content">
                                                    <div className="inner">
                                                        <h3><a href="#">{token.title}</a></h3>
                                                        <span>{token.region}, {token.country}</span>
                                                        <div className="star-rating">
                                                            <div className="rating-counter">(10 reviews)</div>
                                                        <span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star empty"></span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="buttons-to-right">
                                                <a href="#" className="button gray"><i className="fa fa-eye"></i> View</a>
                                                <a href="#" onClick={() => this.unrent(token)} className="button gray"><i className="fa fa-trash"></i> Stop Rent</a>
                                            </div>
                                        </li>
                                    )}
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            </>
        );
    }
}
