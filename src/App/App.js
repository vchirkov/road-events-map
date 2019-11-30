import './App.scss';

import React from 'react';
import {geolocated} from 'react-geolocated';

import {Map} from '../Map';

export const App = geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    watchPosition: true,
})(function App(props) {

    const {
        isGeolocationAvailable,
        isGeolocationEnabled,
        coords,
    } = props;
    alert('app');

    if (!isGeolocationAvailable) return <div>Your browser does not support Geolocation</div>;
    if (!isGeolocationEnabled) return <div>Geolocation is not enabled</div>;


    if (!coords) return <div>awaiting coords</div>;
    alert(coords);
    return (
        <div className="app"
             style={{height: '100vh', width: '100%'}}>
            <Map center={coords}/>
        </div>
    );
});
