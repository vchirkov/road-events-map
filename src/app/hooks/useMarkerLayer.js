import {useState, useMemo, useEffect} from 'react';
import useAxios from 'axios-hooks';
import {stringify} from 'query-string/index';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {GeoJSON} from 'ol/format';
import {containsExtent} from 'ol/extent';
import {transformExtent} from 'ol/proj';
import {RoadEventFeature} from '../util/features/RoadEventFeature';
import useInterval from '@use-it/interval';

import {REFRESH_INTERVAL} from 'common/constants';

const clearMarkerSource = (source) => {
    const extent = source.getExtent();
    source.loadedExtentsRtree_.forEachInExtent(extent, (obj) => {
        if (containsExtent(obj.extent, extent)) {
            source.removeLoadedExtent(obj.extent);
        }
    });
};

export function useMarkerLayer() {
    const [{data, loading, error}, execute] = useAxios({}, {manual: true});

    const markerSource = useMemo(() => new VectorSource({
        format: new GeoJSON(),
        loader: async (extent) => execute({
            url: `/pins?${stringify({
                extent: transformExtent(extent, 'EPSG:3857', 'EPSG:4326')
            })}`
        }),
        strategy: (extent) => [extent],

    }), [execute]);
    const [markerLayer] = useState(() => new VectorLayer({source: markerSource}));

    const refresh = () => {
        clearMarkerSource(markerSource);
        markerSource.refresh();
    };

    useEffect(() => {
        if (!data) return;
        markerSource.addFeatures(data.map(pin => new RoadEventFeature(pin)));
    }, [data, markerSource]);

    useInterval(refresh, REFRESH_INTERVAL);

    return [markerLayer, {
        loading,
        error,
        refresh
    }];
}
