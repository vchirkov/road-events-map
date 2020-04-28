import {useMemo, useEffect} from 'react';
import {Geolocation} from 'ol';

export function useGeolocation(view, onChange) {
    const geolocation = useMemo(() => new Geolocation({
        projection: view.getProjection(),
        enableHighAccuracy: true
    }), [view]);

    useEffect(() => {
        if (!geolocation || !onChange) return;
        const handleChange = () => onChange({
            position: geolocation.getPosition(),
            heading: geolocation.getHeading()
        });

        if (geolocation.getPosition()) {
            handleChange();
        }

        geolocation.setTracking(true);
        geolocation.on('change', handleChange);

        return () => {
            geolocation.setTracking(false);
            geolocation.un('change', handleChange);
        }
    }, [geolocation, onChange]);

    return geolocation;
}
