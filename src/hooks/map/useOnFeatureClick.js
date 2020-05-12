import {useEffect} from 'react';
import {noop} from 'lodash';

import {RoadEventFeature} from '../../util/features/RoadEventFeature';

export function useOnFeatureClick(map, onFeatureSelect = noop) {
    useEffect(() => {
        const onClick = (e) => {
            const feature = map.getFeaturesAtPixel(e.pixel).find((feature => feature instanceof RoadEventFeature));
            const id = feature && feature.getId();

            onFeatureSelect(id, feature);
        };

        map.on('click', onClick);

        return () => map.un(onClick);
    }, [map]);
}
