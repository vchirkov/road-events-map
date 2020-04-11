import {useState} from 'react';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const {
    REACT_APP_MAPTILER_TILES: tileUrl,
    REACT_APP_MAPTILER_TILES2x: tileUrlHiRes,
    REACT_APP_MAPTILER_KEY
} = process.env;

export function useTileLayer() {
    return useState(() => {
        const isHiRes = window.devicePixelRatio > 1;
        const url = `${isHiRes ? tileUrlHiRes : tileUrl}?key=${REACT_APP_MAPTILER_KEY}`;
        const tilePixelRatio = isHiRes ? 2 : 1;
        return new TileLayer({
            source: new XYZ({url, tilePixelRatio})
        });
    });
}
