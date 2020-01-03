import {useMemo, useCallback} from 'react';
import Map from 'ol/Map';
import {defaults} from 'ol/control';

export function useMap({view, layers = [], controls = []}) {
    const map = useMemo(() => new Map({
        view,
        layers,
        controls: defaults().extend(controls)
    }), [view, ...layers, ...controls]);

    const setRef = useCallback(target => map.setTarget(target), [map]);

    return [map, {setRef}];
}
