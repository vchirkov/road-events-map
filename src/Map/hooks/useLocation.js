import {useMemo, useEffect} from 'react';
import {Geolocation, Feature} from 'ol';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Style, Icon} from 'ol/style';

import locationIcon from '../resources/location.png';

export function useLocation(map, opts = {}) {
    const {
        focus = true,
        rotate = true
    } = opts;
    const view = map.getView();

    const marker = useMemo(() => {
        const markerFeature = new Feature(new Point([0, 0]));
        markerFeature.setStyle(new Style({image: new Icon({src: locationIcon})}));
        return markerFeature;
    }, []);

    const geolocation = useMemo(() => new Geolocation({
        projection: view.getProjection(),
        enableHighAccuracy: true
    }), [view]);

    const update = () => {
        if (!geolocation || !view || !marker) return;
        const coords = geolocation.getPosition();
        const heading = geolocation.getHeading();

        if (focus) {
            view.setCenter(coords);
            marker.setGeometry(coords ? new Point(coords) : null);
        }

        if (rotate && heading) {
            view.setRotation(-heading);
            marker.getStyle().getImage().setRotation(0);
        } else if (heading) {
            marker.getStyle().getImage().setRotation(heading);
        }
    };


    useEffect(update, [focus, rotate, geolocation, view, marker])

    useEffect(() => {
        if (!map || !marker) return;
        const source = new VectorSource({features: [marker]});
        new VectorLayer({map, source});
    }, [map, marker]);

    useEffect(() => {
        if (!map || !geolocation || !marker) return;
        geolocation.setTracking(true);
        geolocation.on('change', update);

        update();

        return () => {
            geolocation.setTracking(false);
            geolocation.un('change', update);
        }
    }, [map, view, geolocation, marker]);
}
