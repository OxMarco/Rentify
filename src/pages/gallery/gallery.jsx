import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import TorusLogin from '../../components/torus/torus';
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
                <div className="container">
                    <div className="row row-cols-2">

                        {tokens.map((token, i) =>
                            <div className="col">
                                <div className="card token">
                                    <h5 className="card-header">Category</h5>
                                    <img src={token.image} className="card-img-top" alt="token image" />
                                    <div className="card-body">
                                        <h5 className="card-title">{token.title}</h5>
                                        <p className="card-text">{token.body}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">${token.price}</li>
                                    </ul>
                                    <div className="card-body">
                                        <a href="#" className="card-link">Buy</a>
                                        <a onClick={() => this.viewDetails(token.id)} className="card-link">See More</a>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                <TorusLogin login={this.props.onLogin} address={this.props.address} />
            </>
        );
    }
}