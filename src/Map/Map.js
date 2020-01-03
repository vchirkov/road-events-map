import './Map.scss';

import React, {useEffect, useState} from 'react';

import {useView} from './hooks/useView';
import {useTileLayer} from './hooks/useTileLayer';
import {useMarkerLayer} from './hooks/useMarkerLayer';
import {useMap} from './hooks/useMap';
import {useLocation} from './hooks/useLocation';
import {useLocationControl} from './hooks/useLocationControl';

import {
    LOCATION_DEFAULT,
    LOCATION_INACTIVE
} from './util/constants';
import {useRoadEventControls} from './hooks/useRoadEventControl';

export function Map(props = {}) {
    const {zoom = 16} = props;

    const [locationState, setLocationState] = useState(LOCATION_DEFAULT);
    const [view] = useView({zoom});
    const [tileLayer] = useTileLayer();
    const [markerLayer] = useMarkerLayer();
    const [locationLayer] = useLocation(view, locationState, setLocationState);
    const [locationControl] = useLocationControl(locationState, setLocationState);
    const [roadEventControls] = useRoadEventControls();

    const [map, {setRef}] = useMap({
        view,
        layers: [
            tileLayer,
            markerLayer,
            locationLayer
        ],
        controls: [
            locationControl,
            roadEventControls
        ]
    });

    const setLocationInactive = () => setLocationState(LOCATION_INACTIVE);

    useEffect(() => view.setZoom(zoom), [zoom, view]);
    useEffect(() => {
        map.on('pointerdrag', setLocationInactive);
        return () => map.un('pointerdrag', setLocationInactive);
    }, [map]);

    return (
        <div className="map"
             style={{height: '100vh', width: '100%'}}
             ref={setRef}>
        </div>
    );
}
