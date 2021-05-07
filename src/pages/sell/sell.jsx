import React, { Component } from 'react';
import Header from '../../components/header/header';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import ProgressBar from 'react-bootstrap/ProgressBar';
import emailjs from 'emailjs-com';
import './sell.css';

export default class Sell extends Component {
    constructor (props) {
        super(props);

        console.log('[SELL.JSX] props log in constructor:')
        console.log(this.props);

        this.state = { 
            address: '',
            latitude: '',
            longitude: '',
            country: '',
            region: '',
            zip: '',
            title: '',
            description: '',
            surface: '',
            price: '',
            deposit: '',
            image: null,
            progress: 0,
            button_disabled: false,
            ipfs: this.props.ipfs,
        };
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();

        this.setState({ button_disabled: true });

        const res = await fetch(`https://us1.locationiq.com/v1/search.php?key=pk.f9586cd00dbee8301b57de330d3112a7&format=json&q=${this.state.address}`)
        const response = await res.json();
        console.log(response[0]['lat']);
        this.setState({
            latitude: response[0]['lat'],
            longitude: response[0]['lon']
        });

        this.setState({progress: 25});

        const imageCID = await this.state.ipfs.add(e.target.files[0], {
            progress: (prog) => console.log(prog),
        });
        console.log(imageCID);

        this.setState({progress: 50});

        const data = JSON.stringify({ 
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            country: this.state.country,
            region: this.state.region,
            zip: this.state.zip,
            title: this.state.title,
            description: this.state.description,
            surface: this.state.surface,
            price: this.state.price,
            image: imageCID
        });

        const metadataCID = await this.state.ipfs.add(data);
        console.log("IPFS CID:", metadataCID);

        this.setState({progress: 75});

        await this.sendMail("..."); // TBD
    
        const apiRes = await fetch('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH');
        const priceRes = await apiRes.json();
        const price_eth = this.props.web3.utils.toWei(priceRes['ETH'] * this.state.deposit);

        const flag = await this.props.api.create(metadataCID, price_eth);
        if(!flag) alert('Error');

        this.setState({progress: 100, button_disabled: false });

        e.target.reset();
    }

    sendMail = async (data) => {
        var templateParams = {
            to: this.props.userInfo['email'],
            id: data
        };
        var res = await emailjs.send('service_bi3gqt9', 'template_i3jg7ee', templateParams, 'user_df7doAY0vH3ifJMBgVXNG');
        console.log(res);
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
          [e.target.name]: value
        });
    }

    handleFileChange = (e) => {
        this.setState({ image: e.target.files[0] });
    }

    selectCountry = (val) => {
        this.setState({ country: val });
    }
    
    selectRegion = (val) => {
        this.setState({ region: val });
    }

    render() {
        const { address,
                country,
                region,
                zip,
                title,
                description,
                surface,
                price,
                deposit,
                progress,
                button_disabled
            } = this.state;

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
                        <form className="needs-validation" onSubmit={this.handleFormSubmit}>

                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" name="address" id="address" placeholder="John" min="2" max="255" value={address} onChange={this.handleChange} required />
                                    <div className="invalid-feedback">
                                        A valid address is required.
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="country">Country</label>
                                    <CountryDropdown value={country} onChange={(val) => this.selectCountry(val)}
                                    className="custom-select d-block w-100" name="country" id="country" required />
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="region">Region</label>
                                    <RegionDropdown country={country} value={region} onChange={(val) => this.selectRegion(val)}
                                    className="custom-select d-block w-100" name="region" id="region" required />
                                    <div className="invalid-feedback">
                                        Please provide a valid region.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" name="zip" id="zip" placeholder="012..." value={zip} onChange={this.handleChange} required />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>

                            <hr className="mb-4" />

                            <h4 className="mb-3">Other Data</h4>

                            <div className="mb-3">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" name="title" id="title" placeholder="A catchy title" min="3" max="100" value={title} onChange={this.handleChange} required />
                                <div className="invalid-feedback">
                                    Title is required
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" name="description" id="description" placeholder="Tell us more about the property to let" min="10" max="500" spellCheck="true" value={description} onChange={this.handleChange} required></textarea>
                                <div className="invalid-feedback">
                                    Description is required
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="surface">Surface</label>
                                    <div className="input-group mb-3">
                                        <input type="number" className="form-control" name="surface" id="surface" placeholder="10" value={surface} onChange={this.handleChange} required />
                                        <div className="input-group-append">
                                            <span className="input-group-text" id="basic-addon1">m2</span>
                                        </div>
                                        <div className="invalid-feedback">
                                            Please select a valid number.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="price">Price/day (USD)</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon2">$</span>
                                        </div>
                                        <input type="number" className="form-control" name="price" id="price" placeholder="850" min="1" max="10000" value={price} onChange={this.handleChange} required />
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
                                        <input type="number" className="form-control" name="deposit" id="deposit" placeholder="100" min="50" max="10000" value={deposit} onChange={this.handleChange} required />
                                        <div className="invalid-feedback">
                                            Please choose a valid option.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="mb-4" />

                            <h4 className="mb-3">Media</h4>

                            <div className="mb-3">
                                <label htmlFor="image">Image</label>
                                <input type="file" className="form-control-file" name="image" id="image" accept="image/*" onChange={this.handleFileChange} required />
                                <div className="invalid-feedback">
                                    Image is required
                                </div>
                            </div>
                            <ProgressBar animated now={progress} />


                            <hr className="mb-4" />
                            <button className="btn btn-secondary btn-lg btn-block" type="submit" disabled={button_disabled}>Add to the List</button>
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
      </>
        );
    }
}
