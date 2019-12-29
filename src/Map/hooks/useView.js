import {useMemo} from 'react';
import View from 'ol/View';

export function useView({zoom}) {
    return [useMemo(() => new View({zoom}), [zoom])];
}
