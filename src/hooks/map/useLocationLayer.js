import {useState, useMemo} from 'react';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {MarkerFeature} from '../../util/features/MarkerFeature';
import {useTrackLocation} from '../useTrackLocation';
import {DetectorFeature} from '../../util/features/DetectorFeature';
import {useGeolocation} from './useGeolocation';

export function useLocationLayer(view) {
    const [{isRotate, isFocus}] = useTrackLocation();
    const [marker] = useState(() => new MarkerFeature([0, 0]));
    const [detector] = useState(() => new DetectorFeature([0, 0]));

    const features = useMemo(() => {
        if (!marker || !detector) return;
        return [marker, detector];
    }, [marker, detector]);

    const locationLayer = useMemo(() => new VectorLayer({
        source: new VectorSource({
            features
        })
    }), [features]);

    const onLocationChange = useMemo(() => {
        return ({heading, position} = {}) => {
            if (isRotate && !isNaN(heading)) {
                view.setRotation(-heading);
            }

            if (position) {
                features.forEach(f => f.move(position));
            }

            if (position && (isRotate || isFocus)) {
                view.setCenter(position);
            }
        }
    }, [view, features, isRotate, isFocus]);

    useGeolocation(view, onLocationChange);

    return [locationLayer];
}
