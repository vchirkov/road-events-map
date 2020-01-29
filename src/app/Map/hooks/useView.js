import {useMemo} from 'react';
import View from 'ol/View';

export function useView({zoom = 16} = {}) {
    return [useMemo(() => new View({zoom}), [zoom])];
}
