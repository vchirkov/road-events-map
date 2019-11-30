import {useState, useCallback} from 'react';
import Map from 'ol/Map';
import {DragPan, PinchRotate} from 'ol/interaction';

export function useMap({view, layers = []}) {
    const [map] = useState(new Map({
        controls: [],
        interactions: [
            new PinchRotate(),
            new DragPan()
        ],
        view,
        layers
    }));

    const setRef = useCallback(target => map.setTarget(target), [map]);

    return [map, {setRef}];
}
