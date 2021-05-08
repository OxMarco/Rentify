import React, { Component } from 'react';

export default class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokens: [],
        };
    }

    async componentDidMount () {
        this.setState({ address: this.props.address });

        const all = await this.props.api.getAll();

        var t = [];
        for(var i = 1; i <= all; i++) {
            var temp = await this.props.api.get(i);
            if(temp != null)
                t.push(temp);
        }

        this.setState({ tokens: t });
    }

    remove(id) {
        localStorage.clear();
    }

    render() {
        const { tokens, address } = this.state;

        return (
            <>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h2 className="display-4">Rent a Property</h2>
                    <p className="lead">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It's built with default Bootstrap components and utilities with little customization.</p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 py-2">
                            { tokens && tokens.filter(token => token.tenant === address).map((token, i) =>
                            <div className="card h-100 text-white bg-success" key={i}>
                                <div className="card-body">
                                    <h3 className="card-title">{token.title}</h3>
                                    <p className="card-text">{token.description}</p>
                                    <a href="#" className="btn btn-outline-light">Stop</a>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
