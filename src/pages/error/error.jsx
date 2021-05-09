import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Newsletter from '../../components/newsletter/newsletter';

export default class Error extends Component {

    render() {
        return (
            <>
                <section class="error-wrap">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-6 col-md-10">
                                <div class="text-center">
                                    <img src="https://kumarpreet.com/travlio-live/travlio/assets/assets/img/404.png" class="img-fluid" alt="404" />
                                    <Link class="btn btn-theme" to="/">Back To Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Newsletter />
            </>
        );
    }
}
