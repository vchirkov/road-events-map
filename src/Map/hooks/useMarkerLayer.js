import {useState, useMemo} from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {GeoJSON} from 'ol/format';
import {bbox} from 'ol/loadingstrategy';
import {transformExtent} from 'ol/proj';
import {IconFeature} from '../../util/IconFeature';

import axios from 'axios';
import {stringify} from 'query-string';

export function useMarkerLayer(uri = '/pins', base = window.location.origin) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const markerSource = useMemo(() => new VectorSource({
        format: new GeoJSON(),
        loader: async (extent) => {
            setLoading(true);

            const url = new URL(uri, base);
            url.search = stringify({extent: transformExtent(extent, 'EPSG:3857', 'EPSG:4326')});
            try {
                const {data} = await axios.get(url.toString());
                // markerSource.clear();
                markerSource.addFeatures(data.map(pin => new IconFeature(pin)));
            } catch (e) {
                setError(e);
            }

            setLoading(false);
        },
        strategy: bbox
    }), [uri, base]);
    const [markerLayer] = useState(new VectorLayer({source: markerSource}));

    return [markerLayer, markerSource, {loading, error}];
}
