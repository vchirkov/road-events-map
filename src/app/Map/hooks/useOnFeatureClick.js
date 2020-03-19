import {useEffect} from 'react';
import {noop} from 'lodash';

import Select from 'ol/interaction/Select';

import {RoadEventFeature} from '../../util/features/RoadEventFeature';

export function useOnFeatureClick(map, onFeatureSelect = noop) {
    useEffect(() => {
        const select = new Select({filter: feature => feature instanceof RoadEventFeature});
        select.on('select', (e) => {
            const feature = e.target.getFeatures().item(0);
            const id = feature && feature.getId();
            onFeatureSelect(id, feature);
        });


        map.addInteraction(select);
        return () => map.removeInteraction(select);
    }, [map]);
}
