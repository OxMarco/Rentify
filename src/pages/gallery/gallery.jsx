import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Map from '../../components/map/map';
import './gallery.css';

export default class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect_url: '',
            my_lat: 0,
            my_lng: 0,
            tokens: '',
            address: '',
            tokens: [] 
        };
    }

    async componentDidMount () {
        if(! this.props.loaded ) return;

        this.setState({ address: this.props.address });

        const all = await this.props.api.getAll();
        var t = [];
        for(var i = 0; i < all; i++) {
            t.push(await this.props.api.get(i));
        }

        this.setState({ tokens: t });
    }

    geolocate() {
        var lat_t = 0, lon_t = 0;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat_t = position.coords.latitude;
                lon_t = position.coords.longitude;
            });

        }
        this.setState({ my_lat: lat_t, my_lng: lon_t });
    }

    viewDetails(id) {
        this.setState({redirect_param: id, redirect_url: 'info'});
    }

    remove(id) {
        localStorage.clear();
    }

    render() {
        if (this.state.redirect_url) {
            return <Redirect to={this.state.redirect_url + '/' + this.state.redirect_param} />
        }

        const { tokens, my_lat, my_lng, address } = this.state;

        return (
            <>
                <Header />

                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h2 className="display-4">Rent a Property</h2>
                    <p className="lead">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It's built with default Bootstrap components and utilities with little customization.</p>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="card-deck mb-3 text-center">

                                {tokens && tokens.map((token, i) =>
                                <div className="card mb-4 box-shadow" key={i}>
                                    <div className="card-header">
                                        <h4 className="my-0 font-weight-normal">Free</h4>
                                    </div>
                                    <img src={token.image} className="card-img-top" alt="the property" />
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">${token.price} <small className="text-muted">/ mo</small></h1>
                                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>10 users included</li>
                                            <li>2 GB of storage</li>
                                            <li>Email support</li>
                                            <li>Help center access</li>
                                        </ul>
                                        <button type="button" className="btn btn-lg btn-block btn-outline-primary" onClick={() => this.viewDetails(token.id)}>View More</button>
                                        {token.owner === address &&
                                        <button type="button" className="btn btn-lg btn-block btn-outline-danger" onClick={() => this.remove(token.id)}>Remove</button>
                                        }
                                    </div>
                                </div>
                                )}

                            </div>
                        </div>
                        <div className="col-4">
                            <Map latitude={my_lat} longitude={my_lng} markers={tokens} />
                        </div>
                    </div>

                    <Footer classProp="pt-4 my-md-5 pt-md-5 border-top" />
                </div>
            </>
        );
    }
}
