import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Map from '../../components/map/map';
import './gallery.css';

export default class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect_url: '',
            my_lat: 0,
            my_lng: 0,
            address: '',
            tokens: []
        };
    }

    async componentDidMount () {
        console.info("Did mount");
        console.info("Has logged in");

        this.setState({ address: this.props.address });

        const all = await this.props.api.getAll();

        console.info(all);

        let t = [];
        for(let i = 1; i <= all; i++) {
            try {
                const temp = await this.props.api.get(i);
                t.push(temp);
            } catch (e) {
                console.log("Error");
                console.log(e);
            }
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

    render() {
        if (this.state.redirect_url) {
            return <Redirect to={this.state.redirect_url + '/' + this.state.redirect_param} />
        }

        return (
            <>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h2 className="display-4">Rent a Property</h2>
                    <p className="lead">Find a suitable guest house for your next holiday in a dream location.</p>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="card-deck mb-3 text-center">

                                { this.state.tokens && this.state.tokens.filter(token => token.tenant === '0x0000000000000000000000000000000000000000').map((token) =>
                                <div className="card mb-4 box-shadow" key={token.id}>
                                    <div className="card-header">
                                        <h4 className="my-0 font-weight-normal">Guest House</h4>
                                    </div>
                                    <img src={token.image} className="card-img-top" alt="the property" />
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">${token.price} <small className="text-muted">/ day</small></h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>{token.title}</li>
                                            <li>{token.region}, {token.country}</li>
                                        </ul>
                                        <button type="button" className="btn btn-lg btn-block btn-outline-primary" onClick={() => this.viewDetails(token.id)}>View More</button>
                                    </div>
                                </div>
                                )}

                            </div>
                        </div>
                    </div>
                    <Map latitude={this.state.my_lat} longitude={this.state.my_lng} markers={this.state.tokens} />
                </div>
            </>
        );
    }
}
