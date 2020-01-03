import {useMemo, useEffect, useState} from 'react';
import {Control} from 'ol/control';
import {noop} from 'lodash';

import {
    LOCATION_INACTIVE,
    LOCATION_FOCUS,
    LOCATION_ROTATE,
    LOCATION_DEFAULT
} from '../util/constants';

class LocationControl extends Control {
    static statesSequence = {
        [LOCATION_INACTIVE]: LOCATION_FOCUS,
        [LOCATION_FOCUS]: LOCATION_ROTATE,
        [LOCATION_ROTATE]: LOCATION_INACTIVE
    };

    constructor(locationState = LOCATION_DEFAULT, onChange = noop) {
        const button = document.createElement('button');
        const element = document.createElement('div');
        element.className = 'location-control ol-unselectable ol-control';
        element.appendChild(button);

        super({element});

        this.button = button;
        this.onChange = onChange;
        this.setState(locationState);

        button.addEventListener('click', this.handleClick, false);
    }

    handleClick = () => this.onChange(this.getChangedState());

    getChangedState = () => LocationControl.statesSequence[this.state];

    setState = (state) => {
        this.state = state || this.state;
        this.setButton();
    };

    setButton = () => {
        if (this.state === LOCATION_ROTATE) {
            this.button.innerText = 'R';
        } else if (this.state === LOCATION_FOCUS) {
            this.button.innerText = 'F';
        } else if (this.state === LOCATION_INACTIVE) {
            this.button.innerText = 'I';
        }
    };

    setOnChange = onChange => {
        this.onChange = onChange;
    }
}

export function useLocationControl(locationState, onChange) {
    const [initialState] = useState(locationState);
    const locationControl = useMemo(() => new LocationControl(initialState), [initialState]);
    useEffect(() => locationControl.setOnChange(onChange), [onChange, locationControl]);
    useEffect(() => locationControl.setState(locationState), [locationState, locationControl]);

    return [locationControl];
}
