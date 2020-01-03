import {useMemo, useEffect} from 'react';
import {Geolocation, Feature} from 'ol';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Style, Icon} from 'ol/style';
import {noop} from 'lodash';

import {
    LOCATION_INACTIVE,
    LOCATION_FOCUS,
    LOCATION_ROTATE,
    LOCATION_DEFAULT
} from '../util/constants';

import locationIcon from '../resources/location.png';

export function useLocation(view, locationState = LOCATION_DEFAULT, onChange = noop) {

    const marker = useMemo(() => {
        const markerFeature = new Feature(new Point([0, 0]));
        markerFeature.setStyle(new Style({image: new Icon({src: locationIcon})}));
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
        if (isNaN(geolocation.getHeading())) return;

        const heading = geolocation.getHeading();

        if (locationState === LOCATION_ROTATE) {
            view.setRotation(-heading);
            marker.getStyle().getImage().setRotation(0);
        } else if (locationState === LOCATION_FOCUS || locationState === LOCATION_INACTIVE) {
            marker.getStyle().getImage().setRotation(heading);
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
    }, [view, geolocation, marker]);

    return [locationLayer];
}
