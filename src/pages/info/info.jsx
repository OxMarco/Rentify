import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import SweetAlert from 'sweetalert2-react';
import MapBox from '../../components/mapbox/mapbox';
import { BN, toBN } from 'web3-utils';

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

export default class Info extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: null,
            show: false,
            redirect_url: '',
        };
    }

    async componentDidMount() {
        const id  = this.props.match.params.id;
        var data = await this.props.api.get(id);
        this.setState({ token: data });
    }

    async rent(token) {
        this.setState({ disabled: false });

        const apiRes = await fetch('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH');
        const rates = await apiRes.json();

        const pricePerDayUSD = token.price;
        const usdEthRate = rates["ETH"];
        const pricePerDayETH = pricePerDayUSD * usdEthRate;
        const pricePerDayWEI = this.props.web3.utils.toWei(pricePerDayETH.toFixed(18));
        const pricePerSecondWEI = toBN(pricePerDayWEI).div(new BN("24")).div(new BN("3600")).toNumber();

        const sf = new SuperfluidSDK.Framework({
            web3: this.props.web3,
        });
        await sf.initialize()

        const sfUser = sf.user({
            address: this.props.address,
            token: '0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947'
        });

        const details = await sfUser.details();

        await sfUser.flow({
            recipient: token.owner,
            flowRate: pricePerSecondWEI,
        });

        this.props.api.rent(token.id);

        this.setState({ disabled: false, show: true });
    }

    render() {
        const { token, show, redirect_url } = this.state;

        if (redirect_url) {
            return <Redirect to={redirect_url} />
        }

        return (
            <>
            <SweetAlert
                show={show}
                title="Success"
                text="You have successfully rented this property!"
                onConfirm={() => this.setState({ show: false, redirect_url: 'dashboard' })}
            />

            <div className="image-cover page-title" style={{ backgroundImage: `url("https://kumarpreet.com/travlio-live/travlio/assets/img/banner-5.jpg")` }} data-overlay="6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            
                            <h2 className="ipt-title">About The Property</h2>
                            <span className="ipn-subtitle text-light">Will it be your next destination?</span>
                            
                        </div>
                    </div>
                </div>
            </div>
            
            { token && 
                <>
                    <section>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-6">
                                    <img src={token.image} className="img-fluid" alt="property image" />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="story-wrap explore-content">
                                        <span className="ipn-subtitle">{token.region}, {token.country}</span>
                                        <h2>{token.title}</h2>
                                        <p>{token.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <button type="submit" onClick={() => this.rent(token)}  class="btn btn-primary block">Send Request</button>

                </>
            }
        </>
        );
    }
}
