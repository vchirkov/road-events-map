import './RoadEventSelector.scss';

import React from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router';

import {Button} from '../Button';

import messages from './messages';

import {
    ROAD_EVENT_PATROL,
    ROAD_EVENT_SPEED_CAM,
    ROAD_EVENT_ACCIDENT,
    ROAD_EVENT_ROAD_WORKS
} from '../../constants';

const ROAD_EVENTS = [
    ROAD_EVENT_PATROL,
    ROAD_EVENT_SPEED_CAM,
    ROAD_EVENT_ACCIDENT,
    ROAD_EVENT_ROAD_WORKS
];


export function RoadEventSelector({onRoadEventSelected = noop, onCancel = noop}) {
    const history = useHistory();
    const {formatMessage} = useIntl();

    return (
        <div className="road-event-selector">
            <h1 className="road-event-selector-heading">
                {formatMessage(messages.choose_event_type)}
            </h1>
            <div className="road-event-selector-controls">
                <div className="road-event-selector-options">
                    {ROAD_EVENTS.map(event => (
                        <div key={event}
                             className="road-event-selector-option">
                            <Button className="road-event-selector-option-control"
                                    onClick={() => history.push(`/new-road-event/${event}`)}>
                                <div className="road-event-selector-option-control-content">
                                    <i className={`road-event-selector-option-control-icon road-event-selector-option-control-icon-${event}`}/>
                                    {formatMessage(messages[event])}
                                </div>
                            </Button>
                        </div>
                    ))}
                </div>
                <Button className="road-event-selector-cancel"
                        onClick={() => history.push('/')}>
                    {formatMessage(messages.cancel)}
                </Button>
            </div>
        </div>
    );
}
