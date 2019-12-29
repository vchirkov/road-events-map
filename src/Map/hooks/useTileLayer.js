import {useMemo} from 'react';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export function useTileLayer() {
    return [useMemo(() => new TileLayer({source: new OSM()}), [])];
}
