import React, { Component } from 'react';
import './gallery.css';

export default class Gallery extends Component {
    render() {
        return (
        <div class="card-container">
            <div class="card card-1">
                <div class="card-img"></div>
                <a href="" class="card-link">
                    <div class="card-img-hovered"></div>
                </a>
                <div class="card-info">
                    <div class="card-about">
                        <a class="card-tag tag-news">NEWS</a>
                        <div class="card-time">6/11/2018</div>
                    </div>
                    <h1 class="card-title">There have been big Tesla accident at New Jersey</h1>
                    <div class="card-creator">by <a href="">Sardorbek Usmonov</a></div>
                </div>
            </div>
        </div>
        );
    }
}