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
                                    <div class="card box-shadow" key={token.id}>
                                        <img src={token.image} className="card-img-top" alt="the property" />
                                        <div class="card-body">
                                            <h1 className="card-title pricing-card-title">${token.price} <small className="text-muted">/ day</small></h1>
                                            <h5 class="card-title">{token.title}</h5>
                                            <p class="card-text">{token.region}, {token.country}</p>
                                            <a href="#" class="btn btn-primary" onClick={() => this.viewDetails(token.id)}>View More</a>
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
