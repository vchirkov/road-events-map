import './Map.scss';

import React, {useEffect, useState} from 'react';

import {useView} from './hooks/useView';
import {useTileLayer} from './hooks/useTileLayer';
import {useMarkerLayer} from './hooks/useMarkerLayer';
import {useMap} from './hooks/useMap';
import {useLocation} from './hooks/useLocation';
import {useLocationControl} from './hooks/useLocationControl';

import {LOCATION_DEFAULT} from './util/constants';

export function Map(props = {}) {
    const {zoom = 16} = props;

    const [locationState, setLocationState] = useState(LOCATION_DEFAULT);
    const [view] = useView({zoom});
    const [tileLayer] = useTileLayer();
    const [markerLayer] = useMarkerLayer();
    const [locationControl] = useLocationControl(locationState, setLocationState);
    const [locationLayer] = useLocation(view, locationState, setLocationState);

    const [map, {setRef}] = useMap({
        view,
        layers: [
            tileLayer,
            markerLayer,
            locationLayer
        ],
        controls: [
            locationControl
        ]
    });

    useEffect(() => view.setZoom(zoom), [zoom, view]);

    return (
        <div className="map"
             style={{height: '100vh', width: '100%'}}
             ref={setRef}>
        </div>
    );
}
