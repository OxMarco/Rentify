import React, { Component } from 'react';
import './torus.css';

export default class TorusLogin extends Component {

    requestAccess = async (e) => {
        e.preventDefault();
        this.props.login();
    };

    render() {
        return (
            <a href="#" onClick={this.requestAccess} className="float" style={{display: this.props.address === '' ? 'block' : 'none' }}>
                <i className="fa fa-wallet my-float"></i>
            </a>
        );
    }
}
