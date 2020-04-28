import {useMemo} from 'react';
import useInterval from '@use-it/interval';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {GeoJSON} from 'ol/format';
import {bbox} from 'ol/loadingstrategy';

import {useGetPinsForExtent} from '../pins/useGetPinsForExtent';
import {MARKERS_REFRESH_INTERVAL} from '../../constants';

import {RoadEventFeature} from '../../util/features/RoadEventFeature';

export function useMarkerLayer() {
    const [{loading, error}, execute] = useGetPinsForExtent();

    const markerSource = useMemo(() => new VectorSource({
        format: new GeoJSON(),
        strategy: bbox,
        loader: async (extent) => {
            const {data} = await execute(extent);
            markerSource.getFeaturesInExtent(extent).forEach((feat) => {
                markerSource.removeFeature(feat);
            });
            markerSource.addFeatures(data.map(pin => new RoadEventFeature(pin)));
        }

    }), [execute]);
    const markerLayer = useMemo(() => new VectorLayer({source: markerSource}), [markerSource]);

    const refresh = () => {
        markerSource.loadedExtentsRtree_.clear();
        markerSource.changed();
    };

    useInterval(refresh, MARKERS_REFRESH_INTERVAL);

    return [markerLayer, {
        loading,
        error,
        refresh
    }];
}
