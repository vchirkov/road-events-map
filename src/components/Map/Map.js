import './Map.scss';

import React, {useEffect} from 'react';

import {useMap} from '../../hooks/map/useMap';
import {useLocationLayer} from '../../hooks/map/useLocationLayer';
import {useOnFeatureClick} from '../../hooks/map/useOnFeatureClick';

import {useTrackLocation} from '../../hooks/useTrackLocation';

export function Map(props) {
    const {
        view,
        tileLayer,
        markerLayer,
        showLocationLayer = true,
        showMarkerLayer = true,
        onFeatureSelect,
    } = props;
    const [locationLayer] = useLocationLayer(view);
    const [, {setInactive}] = useTrackLocation();

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
        map.on('pointerdrag', setInactive);
        return () => map.un('pointerdrag', setInactive);
    }, [map, setInactive]);

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
