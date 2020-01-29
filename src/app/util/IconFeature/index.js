import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import icon from './img/pin.png'

export function IconFeature(pin) {
    const feature = new Feature({
        geometry: new Point(fromLonLat([...pin.location.coordinates]))
    });
    const style = new Style({
        image: new Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: icon,
            scale: 0.1
        }))
    });
    feature.setStyle(style);
    return feature;
}
