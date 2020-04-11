import {useState, useMemo, useEffect} from 'react';
import {Geolocation} from 'ol';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {MarkerFeature} from '../../util/features/MarkerFeature';
import {useTrackLocation} from '../useTrackLocation';

export function useLocationLayer(view) {
    const [{isRotate, isFocus}] = useTrackLocation();
    const [marker] = useState(() => new MarkerFeature([0, 0]));

    const locationLayer = useMemo(() => new VectorLayer({
        source: new VectorSource({
            features: [marker]
        })
    }), [marker]);

    const geolocation = useMemo(() => new Geolocation({
        projection: view.getProjection(),
        enableHighAccuracy: true
    }), [view]);

    const update = () => {
        if (!geolocation || !view || !marker) return;

        updateHeading();
        updatePosition();
    };

    const updateHeading = () => {
        const heading = geolocation.getHeading();

        if (isRotate && !isNaN(heading)) {
            view.setRotation(-heading);
        }
    };

    const updatePosition = () => {
        if (!geolocation.getPosition()) return;

        const coords = geolocation.getPosition();

        marker.move(coords);
        if (isRotate || isFocus) {
            view.setCenter(coords);
        }
    };


    useEffect(update, [isRotate, isFocus, geolocation, view, marker]);

    useEffect(() => {
        if (!geolocation || !marker) return;
        geolocation.setTracking(true);
        geolocation.on('change', update);

        update();

        return () => {
            geolocation.setTracking(false);
            geolocation.un('change', update);
        }
    }, [isRotate, isFocus, geolocation, view, marker]);

    return [locationLayer];
}
