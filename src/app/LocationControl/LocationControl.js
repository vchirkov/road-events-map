import './LocationControl.scss';

import React from 'react';
import classnames from 'classnames';
import {noop} from 'lodash';

import {Button} from 'common/components/Button/Button';

import {
    LOCATION_FOCUS,
    LOCATION_INACTIVE,
    LOCATION_ROTATE,
    LOCATION_DEFAULT
} from 'common/constants';

const STATE_SEQUENCE = {
    [LOCATION_INACTIVE]: LOCATION_FOCUS,
    [LOCATION_FOCUS]: LOCATION_ROTATE,
    [LOCATION_ROTATE]: LOCATION_INACTIVE
};

export function LocationControl({state = LOCATION_DEFAULT, onChange = noop}) {
    const classNames = classnames('location-control-btn', `location-control-btn-${state}`);

    return (
        <div className="location-control">
            <Button className={classNames}
                    onClick={() => onChange(STATE_SEQUENCE[state])}>
            </Button>
        </div>
    );
}
