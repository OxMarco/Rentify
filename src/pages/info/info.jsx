import React, { Component } from 'react';
import MapBox from '../../components/mapbox/mapbox';
import './info.css';

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

export default class Info extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: null,
        };
    }

    async componentDidMount() {
        const id  = this.props.match.params.id;
        console.log("ID")
        console.log(id)
        var data = await this.props.api.get(id);
        this.setState({ token: data });
    }

    async buy(id) {
        await this.props.login()

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
            recipient: '0x35d389B751943Cbf3fE3620a668566E97D5f0144',
            flowRate: '1000'
        });
    }

    render() {
        const { token } = this.state;

        return (
        <div className="container">
            <div className="py-5 text-center">
                <h2 className="display-4">Details</h2>
                <p className="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
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
                            <p>{token.description}</p>
                            <div className="product-count">
                                <a href="#" className="round-black-btn">Rent Now</a>
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
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                            {token.description}
                            <br />
                            <div className="row-fluid">
                                <MapBox lat={token.latitude} lng={token.longitude} />
                            </div>
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
                    </div>
                </div>
            </>
            }
        </div>
        );
    }
}
