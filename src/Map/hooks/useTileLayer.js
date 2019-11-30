import {useState} from 'react';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export function useTileLayer() {
    const [tileLayer] = useState(new TileLayer({source: new OSM()}));
    return [tileLayer];
}
