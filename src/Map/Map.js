import './Map.scss';

import React, {useEffect, useState} from 'react';

import {useView} from './hooks/useView';
import {useTileLayer} from './hooks/useTileLayer';
import {useMarkerLayer} from './hooks/useMarkerLayer';
import {useMap} from './hooks/useMap';
import {useLocation} from './hooks/useLocation';

export function Map(props = {}) {
    const {zoom = 16} = props;

    const [focus, setFocus] = useState(true);
    const [rotate, setRotate] = useState(true);
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
    useLocation(map, {focus, rotate});

    useEffect(() => view.setZoom(zoom), [zoom, view]);

    return (
        <div className="map"
             style={{height: '100vh', width: '100%'}}
             ref={setRef}>
        </div>
    );
}
