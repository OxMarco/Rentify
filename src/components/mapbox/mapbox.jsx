import React, { Component } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import './mapbox.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5lbGl0byIsImEiOiJja2NqcXl5djkxbXVpMnRvOG52NHNwYml4In0.jCcDM96ArjXIaDHGqRUvSA';

export default class MapBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lng: this.props.lng,
            lat: this.props.lat,
            zoom: 9
        };
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
    }

    render() {
        const { lng, lat, zoom } = this.state;
        
        return (
            <>
                <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={this.mapContainer} className="map-container" />
            </>
        );
    }
}
