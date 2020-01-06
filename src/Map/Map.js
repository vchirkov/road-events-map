import './Map.scss';

import React, {useEffect, useState} from 'react';

import {useView} from './hooks/useView';
import {useTileLayer} from './hooks/useTileLayer';
import {useMarkerLayer} from './hooks/useMarkerLayer';
import {useMap} from './hooks/useMap';
import {useLocation} from './hooks/useLocation';
import {useRoadEventControls} from './hooks/useRoadEventControl';
import {LocationControl} from './components/LocationControl';

import {
    LOCATION_DEFAULT,
    LOCATION_INACTIVE
} from '../common/constants';

export function Map(props = {}) {
    const {zoom = 16} = props;

    const [locationState, setLocationState] = useState(LOCATION_DEFAULT);
    const [view] = useView({zoom});
    const [tileLayer] = useTileLayer();
    const [markerLayer] = useMarkerLayer();
    const [locationLayer] = useLocation(view, locationState, setLocationState);
    const [roadEventControls] = useRoadEventControls();

    const [map, {setRef}] = useMap({
        view,
        layers: [
            tileLayer,
            markerLayer,
            locationLayer
        ],
    });

    const setLocationInactive = () => setLocationState(LOCATION_INACTIVE);

    useEffect(() => view.setZoom(zoom), [zoom, view]);
    useEffect(() => {
        map.on('pointerdrag', setLocationInactive);
        return () => map.un('pointerdrag', setLocationInactive);
    }, [map]);

    return (
        <div className="map">
            <div className="map-block"
                 style={{height: '100vh', width: '100%'}}
                 ref={setRef}>
            </div>
            <div className="map-bottom-section">
                <LocationControl onChange={setLocationState}
                                 state={locationState}/>
            </div>
        </div>
    );
}
