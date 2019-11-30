import './Map.scss';

import React, {useEffect} from 'react';
import {fromLonLat} from 'ol/proj.js';

import {useView} from './hooks/useView';
import {useTileLayer} from './hooks/useTileLayer';
import {useMarkerLayer} from './hooks/useMarkerLayer';
import {useMap} from './hooks/useMap';

export function Map(props = {}) {
    const {
        center = {},
        zoom = 16
    } = props;

    const {latitude, longitude} = center || {};

    const [view] = useView({zoom});
    const [tileLayer] = useTileLayer();
    const [markerLayer] = useMarkerLayer();
    const [map, {setRef}] = useMap({
        view,
        layers: [
            tileLayer,
            markerLayer
        ]
    });

    useEffect(() => {
        map.getView().setCenter(fromLonLat([longitude, latitude]));
    }, [longitude, latitude, map]);

    useEffect(() => {
        view.setZoom(zoom);
    }, [zoom, view]);

    return (
        <div className="map"
             style={{height: '100vh', width: '100%'}}
             ref={setRef}>
        </div>
    );
}
