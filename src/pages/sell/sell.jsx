import React, { Component } from 'react';
import Header from '../../components/header/header';
import TorusLogin from '../../components/torus/torus';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import './sell.css';

export default class Sell extends Component {
    constructor (props) {
        super(props);
        this.state = { country: '', region: '' };
    }
    
    selectCountry (val) {
        this.setState({ country: val });
    }

    selectRegion (val) {
        this.setState({ region: val });
    }

    render() {
        const { country, region } = this.state;

        return (
        <>
            <Header />

            <div className="container">
                <div className="py-5 text-center">
                    <h2 className="display-4">Let a Property</h2>
                    <p className="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
                </div>

                <div className="row">
                    <div className="col">
                        <h4 className="mb-3">Main Data</h4>
                        <form className="needs-validation">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label for="firstName">First name</label>
                                    <input autofocus type="text" className="form-control" id="firstName" placeholder="John" min="2" max="50" required />
                                    <div className="invalid-feedback">
                                        A valid first name is required.
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label for="lastName">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Doe" min="2" max="50" required />
                                    <div className="invalid-feedback">
                                        A valid last name is required.
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="address">Address</label>
                                <div className="input-group">
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" min="3" max="100" required />
                                    <div className="invalid-feedback">
                                        A valid address is required.
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label for="country">Country</label>
                                    <CountryDropdown value={country} onChange={(val) => this.selectCountry(val)} 
                                    className="custom-select d-block w-100" id="country" required />
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label for="state">State</label>
                                    <RegionDropdown country={country} value={region} 
                                    onChange={(val) => this.selectRegion(val)} className="custom-select d-block w-100" id="state" required />
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="012..." required />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>

                            <hr className="mb-4" />

                            <h4 className="mb-3">Other Data</h4>

                            <div className="mb-3">
                                <label for="title">Title</label>
                                <input type="text" className="form-control" id="title" placeholder="A catchy title" min="3" max="100" required />
                                <div className="invalid-feedback">
                                    Title is required
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="description">Description</label>
                                <textarea className="form-control" id="description" placeholder="Tell us more about the property to let" min="10" max="500" spellcheck="true" required></textarea>
                                <div className="invalid-feedback">
                                Description is required
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label for="surface">Surface</label>
                                    <input type="number" className="form-control" id="surface" placeholder="10 m2" required />
                                    <div className="invalid-feedback">
                                        Please select a valid number.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label for="price">Price/month (USD)</label>
                                    <input type="number" className="form-control" id="price" placeholder="$850" min="1" max="10000" required />
                                    <div className="invalid-feedback">
                                        Please provide a valid number.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="deposit">Deposit</label>
                                    <input type="number" className="form-control" id="deposit" placeholder="$200" min="0" max="10000" required />
                                    <div className="invalid-feedback">
                                        Please choose a valid option.
                                    </div>
                                </div>
                            </div>

                            <hr className="mb-4" />
                            <button className="btn btn-secondary btn-lg btn-block" type="submit">Add to the List</button>
                        </form>
                    </div>
                </div>

                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">- The Fluidifier -</p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href="/">Home</a></li>
                        <li className="list-inline-item"><a href="/gallery">Gallery</a></li>
                        <li className="list-inline-item"><a href="/about">About</a></li>
                    </ul>
                </footer>
            </div>

            <TorusLogin login={this.props.onLogin} address={this.props.address} />

      </>
        );
    }
}

// titolo / descrizione / prezzo al mese in usd / extra (lista stringhe) / wallet / indirizzo della casa / foto