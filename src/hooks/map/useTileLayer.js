import {useState} from 'react';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export function useTileLayer() {
    return useState(() => new TileLayer({source: new OSM()}));
}
