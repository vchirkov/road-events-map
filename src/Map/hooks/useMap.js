import {useMemo, useCallback} from 'react';
import Map from 'ol/Map';

export function useMap({view, layers = [], controls = []}) {
    const map = useMemo(() => new Map({
        view,
        layers,
        controls: controls
    }), [view, ...layers, ...controls]);

    const setRef = useCallback(target => map.setTarget(target), [map]);

    return [map, {setRef}];
}
