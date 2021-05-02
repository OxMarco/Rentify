import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './home.css';

export default class Home extends Component {

    render() {
        return (
            <>
                <Header />

                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 font-weight-normal">The Fluidifier</h1>
                        <p className="lead font-weight-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple's marketing pages.</p>
                        <Link className="btn btn-outline-secondary" to="/gallery">Explore Opportunities</Link>
                    </div>
                    <div className="product-device box-shadow d-none d-md-block"></div>
                    <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                    <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                        <div className="my-3 py-3">
                            <h2 className="display-5">Another headline</h2>
                            <p className="lead">And an even wittier subheading.</p>
                        </div>
                        <div className="bg-light box-shadow mx-auto custom"></div>
                    </div>
                    <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                        <div className="my-3 p-3">
                            <h2 className="display-5">Another headline</h2>
                            <p className="lead">And an even wittier subheading.</p>
                        </div>
                        <div className="bg-dark box-shadow mx-auto custom"></div>
                    </div>
                </div>

                <footer className="container py-5">
                    <Footer />
                </footer>
            </>
        );
    }
}