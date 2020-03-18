import {useMemo, useEffect} from 'react';
import {Geolocation, Feature} from 'ol';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Style, Circle, Stroke, Fill} from 'ol/style';

import {
    LOCATION_FOCUS,
    LOCATION_ROTATE,
    LOCATION_DEFAULT
} from 'common/constants';

export function useLocation(view, locationState = LOCATION_DEFAULT) {

    const marker = useMemo(() => {
        const markerFeature = new Feature(new Point([0, 0]));
        markerFeature.setStyle(new Style({
            image: new Circle({
                radius: 14,
                fill: new Fill({color: '#3bcde2'}),
                stroke: new Stroke({
                    color: '#ffffff',
                    width: 2
                })
            })
        }));
        return markerFeature;
    }, []);

    const locationLayer = useMemo(() => {
        if (!marker) return;
        return new VectorLayer({source: new VectorSource({features: [marker]})});
    }, [marker]);

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

        if (locationState === LOCATION_ROTATE && !isNaN(heading)) {
            view.setRotation(-heading);
        }
    };

    const updatePosition = () => {
        if (!geolocation.getPosition()) return;

        const coords = geolocation.getPosition();

        marker.setGeometry(new Point(coords));
        if (locationState === LOCATION_ROTATE || locationState === LOCATION_FOCUS) {
            view.setCenter(coords);
        }
    };


    useEffect(update, [locationState, geolocation, view, marker]);

    useEffect(() => {
        if (!geolocation || !marker) return;
        geolocation.setTracking(true);
        geolocation.on('change', update);

        update();

        return () => {
            geolocation.setTracking(false);
            geolocation.un('change', update);
        }
    }, [locationState, geolocation, view, marker]);

    return [locationLayer];
}
