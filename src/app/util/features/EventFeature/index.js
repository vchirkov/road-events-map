import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import {
    ROAD_EVENT_PATROL,
    ROAD_EVENT_SPEED_CAM,
    ROAD_EVENT_ACCIDENT,
    ROAD_EVENT_ROAD_WORKS,
} from 'common/constants';


import patrolIcon from './img/patrol.png';
import speedCamIcon from './img/speed_cam.png';
import roadWorksIcon from './img/road_works.png';
import accidentIcon from './img/accident.png';
import otherIcon from './img/other.png';

function getIcon({type} = {}) {
    switch (type) {
        case ROAD_EVENT_PATROL:
            return patrolIcon;
        case ROAD_EVENT_SPEED_CAM:
            return speedCamIcon;
        case ROAD_EVENT_ACCIDENT:
            return accidentIcon;
        case ROAD_EVENT_ROAD_WORKS:
            return roadWorksIcon;
        default:
            return otherIcon;
    }
}

export function EventFeature(pin) {
    const feature = new Feature({
        geometry: new Point(fromLonLat([...pin.location.coordinates]))
    });
    const style = new Style({
        image: new Icon(({
            anchor: [0.5, 0.5],
            src: getIcon(pin),
            size: [76, 76],
            scale: 0.5
        }))
    });
    feature.setId(pin._id);
    feature.setStyle(style);
    return feature;
}
