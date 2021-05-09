import React, { Component } from 'react';

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

export default class Dashboard extends Component {
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
        const { tokens, address } = this.state;

        return (
            <>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h2 className="display-4">User Dashboard</h2>
                    <p className="lead">Here you can see and manage your properties to let and your rented properties.</p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 py-2">
                            { tokens && tokens.filter(token => token.tenant === address).map((token) =>
                            <div className="card h-100 text-white bg-danger" key={token.id}>
                                <div className="card-body">
                                    <h3 className="card-title">{token.title}</h3>
                                    <p className="card-text">{token.description}</p>
                                    <a href="#" onClick={() => this.unrent(token)} className="btn btn-outline-light">Stop</a>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4 py-2">
                            { tokens && tokens.filter(token => token.owner === address).map((token) =>
                            <div className="card h-100 text-white bg-success" key={token.id}>
                                <div className="card-body">
                                    <h3 className="card-title">{token.title}</h3>
                                    <p className="card-text">{token.description}</p>
                                    <a href="#" onClick={() => this.remove(token)} className="btn btn-outline-light">Remove</a>
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
