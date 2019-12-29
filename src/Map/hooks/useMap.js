import {useMemo, useCallback} from 'react';
import Map from 'ol/Map';

export function useMap({view, layers = []}) {
    const map = useMemo(() => new Map({
        view,
        layers
    }), [view, ...layers]);

    const setRef = useCallback(target => map.setTarget(target), [map]);

    return [map, {setRef}];
}
