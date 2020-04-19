import './Map.scss';

import React, {useEffect} from 'react';

import {useMap} from '../../hooks/map/useMap';
import {useLocationLayer} from '../../hooks/map/useLocationLayer';
import {useOnFeatureClick} from '../../hooks/map/useOnFeatureClick';

import {useTrackLocation} from '../../hooks/useTrackLocation';
import {useRouteMatch} from 'react-router';

export function Map(props) {
    const {
        view,
        tileLayer,
        markerLayer,
        onFeatureSelect,
    } = props;
    const [locationLayer] = useLocationLayer(view);
    const [, {setInactive}] = useTrackLocation();
    const match = useRouteMatch('/new-road-event/:event');

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

    useEffect(() => locationLayer.setVisible(!match?.params?.event), [locationLayer, match?.params?.event]);

    return (
        <div className="map">
            <div className="map-block"
                 style={{height: '100vh', width: '100%'}}
                 ref={setRef}>
            </div>
        </div>
    );
}
