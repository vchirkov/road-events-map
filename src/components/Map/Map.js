import './Map.scss';

import React, {useEffect} from 'react';
import {noop} from 'lodash';

import {useMap} from '../../hooks/map/useMap';
import {useLocationLayer} from '../../hooks/map/useLocationLayer';
import {useOnFeatureClick} from '../../hooks/map/useOnFeatureClick';

import {LOCATION_INACTIVE} from '../../constants';

export function Map(props) {
    const {
        view,
        locationState,
        tileLayer,
        markerLayer,
        showLocationLayer = true,
        showMarkerLayer = true,
        onLocationStateChange = noop,
        onFeatureSelect,
    } = props;
    const [locationLayer] = useLocationLayer(view, locationState);

    const [map, {setRef}] = useMap({
        view,
        layers: [
            tileLayer,
            markerLayer,
            locationLayer
        ],
    });

    useOnFeatureClick(map, onFeatureSelect);

    useEffect(() => {
        const setLocationInactive = () => onLocationStateChange(LOCATION_INACTIVE);

        map.on('pointerdrag', setLocationInactive);
        return () => map.un('pointerdrag', setLocationInactive);
    }, [map, onLocationStateChange]);

    useEffect(() => locationLayer.setVisible(showLocationLayer), [locationLayer, showLocationLayer]);
    useEffect(() => markerLayer.setVisible(showMarkerLayer), [markerLayer, showMarkerLayer]);

    return (
        <div className="map">
            <div className="map-block"
                 style={{height: '100vh', width: '100%'}}
                 ref={setRef}>
            </div>
        </div>
    );
}
