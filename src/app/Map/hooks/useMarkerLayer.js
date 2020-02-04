import {useState, useMemo, useEffect} from 'react';
import useAxios from 'axios-hooks';
import {stringify} from 'query-string/index';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {GeoJSON} from 'ol/format';
import {bbox} from 'ol/loadingstrategy';
import {transformExtent} from 'ol/proj';
import {IconFeature} from '../../util/IconFeature';

export function useMarkerLayer(uri = '/pins', base = window.location.origin) {
    const [{data, loading, error}, execute] = useAxios({}, {manual: true});

    const markerSource = useMemo(() => new VectorSource({
        format: new GeoJSON(),
        loader: async (extent) => {
            execute({
                url: `/pins?${stringify({
                    extent: transformExtent(extent, 'EPSG:3857', 'EPSG:4326')
                })}`
            });
        },
        strategy: bbox
    }), [uri, base]);
    const [markerLayer] = useState(new VectorLayer({source: markerSource}));

    useEffect(() => {
        if (!data) return;
        // markerSource.clear();
        markerSource.addFeatures(data.map(pin => new IconFeature(pin)));
    }, [data]);

    return [markerLayer, markerSource, {loading, error}];
}
