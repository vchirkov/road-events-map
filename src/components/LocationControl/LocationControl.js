import './LocationControl.scss';

import React from 'react';
import classnames from 'classnames';

import {Button} from '../Button';

import {useTrackLocation} from '../../hooks/useTrackLocation';

export function LocationControl() {
    const [{state}, {toggleState}] = useTrackLocation();
    const classNames = classnames('location-control-btn', `location-control-btn-${state}`);

    return (
        <div className="location-control">
            <Button className={classNames}
                    onClick={toggleState}>
            </Button>
        </div>
    );
}
