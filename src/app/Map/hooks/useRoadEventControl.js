import {useMemo, useEffect} from 'react';
import {Control} from 'ol/control';
import {noop} from 'lodash';

import {
    ROAD_EVENT_PATROL,
    ROAD_EVENT_SPEED_CAM,
    ROAD_EVENT_ACCIDENT,
    ROAD_EVENT_ROAD_WORKS
} from '../../../common/constants';

const ROAD_EVENTS = [
    ROAD_EVENT_PATROL,
    ROAD_EVENT_SPEED_CAM,
    ROAD_EVENT_ACCIDENT,
    ROAD_EVENT_ROAD_WORKS
];

class RoadEventControls extends Control {
    constructor(onClick = noop) {
        const element = document.createElement('div');
        element.className = `road-events-controls ol-unselectable ol-control`;

        super({element});

        this.onClick = onClick;
        ROAD_EVENTS.map(this.getControl)
            .forEach(button => element.appendChild(button));
    }

    setOnClick = onClick => this.onClick = onClick;

    handleClick = (e, roadEventName) => this.onClick(e, roadEventName);

    getControl = (roadEventName) => {
        const button = document.createElement('button');
        button.className = `${roadEventName}-control`;
        button.addEventListener('click', (e) => this.handleClick(e, roadEventName), false);
        return button;
    }
}

export function useRoadEventControls(onClick) {
    const roadEventControls = useMemo(() => new RoadEventControls(), []);

    useEffect(() => roadEventControls.setOnClick(onClick), [onClick]);

    return [roadEventControls];
}
