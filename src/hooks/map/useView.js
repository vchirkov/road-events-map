import {useState} from 'react';
import View from 'ol/View';
import {sizeToResolution} from '../../util/sizeToResolution';

export function useView() {
    return useState(() => new View({
        maxResolution: sizeToResolution(1500),
        minResolution: sizeToResolution(200),
        resolution: sizeToResolution(300)
    }));
}
