import {useState} from 'react';
import View from 'ol/View';
import {sizeToResolution} from '../../util/sizeToResolution';

export function useView() {
    return useState(() => new View({
        maxResolution: sizeToResolution(3000),
        minResolution: sizeToResolution(100),
        resolution: sizeToResolution(500)
    }));
}
