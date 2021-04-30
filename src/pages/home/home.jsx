import React, { Component } from 'react';
import TorusLogin from '../../components/torus/torus';
import './home.css';

export default class Home extends Component {

    render() {
        return (
            <main className="page-content">
                <div className="card">
                    <div className="content">
                        <h2 className="title">Loans&Mortages</h2>
                        <p className="copy">Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p>
                        <button className="btn">Explore proposals</button>
                    </div>
                </div>

                <TorusLogin />
            </main>
        );
    }
}