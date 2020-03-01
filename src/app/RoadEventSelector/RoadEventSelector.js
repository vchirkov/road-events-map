import './RoadEventSelector.scss';

import React from 'react';
import {useIntl} from 'react-intl';
import {noop} from 'lodash';

import {Button} from 'common/components/Button';

import messages from './resources/messages';

import {
    ROAD_EVENT_PATROL,
    ROAD_EVENT_SPEED_CAM,
    ROAD_EVENT_ACCIDENT,
    ROAD_EVENT_ROAD_WORKS
} from 'common/constants';

const ROAD_EVENTS = [
    ROAD_EVENT_PATROL,
    ROAD_EVENT_SPEED_CAM,
    ROAD_EVENT_ACCIDENT,
    ROAD_EVENT_ROAD_WORKS
];


export function RoadEventSelector({onRoadEventSelected = noop, onCancel = noop}) {
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
                                    onClick={() => onRoadEventSelected(event)}>
                                <div className="road-event-selector-option-control-content">
                                    <i className={`road-event-selector-option-control-icon road-event-selector-option-control-icon-${event}`}/>
                                    {formatMessage(messages[event])}
                                </div>
                            </Button>
                        </div>
                    ))}
                </div>
                <Button className="road-event-selector-cancel"
                        onClick={() => onCancel()}>
                    {formatMessage(messages.cancel)}
                </Button>
            </div>
        </div>
    );
}
