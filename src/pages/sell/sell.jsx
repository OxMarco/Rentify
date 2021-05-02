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
                                    <label htmlFor="first_name">First name</label>
                                    <input autoFocus type="text" className="form-control" id="first_name" placeholder="John" min="2" max="50" required />
                                    <div className="invalid-feedback">
                                        A valid first name is required.
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="last_name">Last name</label>
                                    <input type="text" className="form-control" id="last_name" placeholder="Doe" min="2" max="50" required />
                                    <div className="invalid-feedback">
                                        A valid last name is required.
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <div className="input-group">
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" min="3" max="100" required />
                                    <div className="invalid-feedback">
                                        A valid address is required.
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="country">Country</label>
                                    <CountryDropdown value={country} onChange={(val) => this.selectCountry(val)} 
                                    className="custom-select d-block w-100" id="country" required />
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="region">Region</label>
                                    <RegionDropdown country={country} value={region} 
                                    onChange={(val) => this.selectRegion(val)} className="custom-select d-block w-100" id="region" required />
                                    <div className="invalid-feedback">
                                        Please provide a valid region.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="012..." required />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>

                            <hr className="mb-4" />

                            <h4 className="mb-3">Other Data</h4>

                            <div className="mb-3">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" placeholder="A catchy title" min="3" max="100" required />
                                <div className="invalid-feedback">
                                    Title is required
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" id="description" placeholder="Tell us more about the property to let" min="10" max="500" spellCheck="true" required></textarea>
                                <div className="invalid-feedback">
                                Description is required
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="surface">Surface</label>
                                    <div className="input-group mb-3">
                                        <input type="number" className="form-control" id="surface" placeholder="10" required />
                                        <div className="input-group-append">
                                            <span className="input-group-text" id="basic-addon1">m2</span>
                                        </div>
                                        <div className="invalid-feedback">
                                            Please select a valid number.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="price">Price/month (USD)</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon2">$</span>
                                        </div>
                                        <input type="number" className="form-control" id="price" placeholder="850" min="1" max="10000" required />
                                        <div className="invalid-feedback">
                                            Please provide a valid number.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="deposit">Deposit (USD)</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon3">$</span>
                                        </div>
                                        <input type="number" className="form-control" id="deposit" placeholder="200" min="0" max="10000" required />
                                        <div className="invalid-feedback">
                                            Please choose a valid option.
                                        </div>
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