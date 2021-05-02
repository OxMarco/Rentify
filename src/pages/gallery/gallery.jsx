import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './gallery.css';

export default class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect_url: '',
        };
    }

    viewDetails(id) {
        this.setState({redirect_param: id, redirect_url: 'info'});
    }

    render() {
        if (this.state.redirect_url) {
            return <Redirect to={this.state.redirect_url + '/' + this.state.redirect_param} />
        }

        var tokens = [
            {
                id: 1,
                title: 'token1',
                body: 'lorem ipsum dolor sit amet',
                price: 100,
                image: 'https://picsum.photos/seed/picsum/300/200',
            }
        ];

        return (
            <>
                <Header />

                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h2 className="display-4">Rent a Property</h2>
                    <p className="lead">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It's built with default Bootstrap components and utilities with little customization.</p>
                </div>

                <div className="container">
                    <div className="card-deck mb-3 text-center">

                        {tokens.map((token, i) =>
                        <div className="card mb-4 box-shadow">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Free</h4>
                            </div>
                            <img src="https://picsum.photos/seed/picsum/200/300" className="card-img-top" alt="the property" />
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
                            </div>
                        </div>
                        )}

                    </div>
                    
                    <footer className="pt-4 my-md-5 pt-md-5 border-top">
                        <Footer />
                    </footer>
                </div>
            </>
        );
    }
}