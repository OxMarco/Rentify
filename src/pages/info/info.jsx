import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import SweetAlert from 'sweetalert2-react';
import MapBox from '../../components/mapbox/mapbox';
import './info.css';

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
        console.log("ID")
        console.log(id)
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

        console.log("USD per day: " + pricePerDayUSD);
        console.log("ETH per day: " + pricePerDayETH);
        console.log("WEI per day: " + pricePerDayWEI);
        console.log("WEI per second:" + pricePerSecondWEI);

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
        <div className="container">
            <SweetAlert
                show={show}
                title="Success"
                text="You have successfully rented this property!"
                onConfirm={() => this.setState({ show: false, redirect_url: 'dashboard' })}
            />
            <div className="py-5 text-center">
                <h2 className="display-4">Details</h2>
                <p className="lead">Explore the guest house of your dreams.</p>
            </div>

            { token && 
            <>
                <div className="row">
                    <div className="col-md-6">
                        <div id="slider" className="product-thumb">
                            <div className="item">
                                <img src={token.image} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-dtl">
                            <div className="product-info">
                                <div className="product-name">{token.title}</div>
                                <div className="reviews-counter">
                                    <div className="rate">
                                        <input type="radio" id="star5" name="rate" value="5" />
                                        <label htmlFor="star5" title="text">5 stars</label>
                                        <input type="radio" id="star4" name="rate" value="4" />
                                        <label htmlFor="star4" title="text">4 stars</label>
                                        <input type="radio" id="star3" name="rate" value="3" />
                                        <label htmlFor="star3" title="text">3 stars</label>
                                        <input type="radio" id="star2" name="rate" value="2" />
                                        <label htmlFor="star2" title="text">2 stars</label>
                                        <input type="radio" id="star1" name="rate" value="1" />
                                        <label htmlFor="star1" title="text">1 star</label>
                                    </div>
                                    <span>0 Reviews</span>
                                </div>
                                <div className="product-price-discount"><span>${token.price}</span><span className="line-through">/ day</span></div>
                            </div>
                            <div className="product-count">
                                <a href="#" onClick={() => this.rent(token)} className="round-black-btn">Rent Now</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-info-tabs">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Reviews (0)</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="map-tab" data-toggle="tab" href="#map" role="tab" aria-controls="map" aria-selected="false">Map</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                            {token.description}
                        </div>
                        <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                            <div className="review-heading">REVIEWS</div>
                            <p className="mb-20">There are no reviews yet.</p>
                            <form className="review-form">
                                <div className="form-group">
                                    <label>Your rating</label>
                                    <div className="reviews-counter">
                                        <div className="rate">
                                            <input type="radio" id="star5" name="rate" value="5" />
                                            <label htmlFor="star5" title="text">5 stars</label>
                                            <input type="radio" id="star4" name="rate" value="4" />
                                            <label htmlFor="star4" title="text">4 stars</label>
                                            <input type="radio" id="star3" name="rate" value="3" />
                                            <label htmlFor="star3" title="text">3 stars</label>
                                            <input type="radio" id="star2" name="rate" value="2" />
                                            <label htmlFor="star2" title="text">2 stars</label>
                                            <input type="radio" id="star1" name="rate" value="1" />
                                            <label htmlFor="star1" title="text">1 star</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Your message</label>
                                    <textarea className="form-control" rows="10"></textarea>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" name="" className="form-control" placeholder="Name*" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" name="" className="form-control" placeholder="Email Id*" />
                                        </div>
                                    </div>
                                </div>
                                <button className="round-black-btn">Submit Review</button>
                            </form>
                        </div>
                        <div className="tab-pane fade" id="map" role="tabpanel" aria-labelledby="map-tab">
                            <div className="row-fluid">
                                <MapBox lat={token.latitude} lng={token.longitude} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
        );
    }
}
