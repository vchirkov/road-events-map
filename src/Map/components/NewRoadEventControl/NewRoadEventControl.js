import './NewRoadEventControl.scss';

import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {noop} from 'lodash';

import {Button} from '../../../common/components/Button';
import {SwipablePopup} from '../../../common/components/SwipablePopup';

import messages from './resources/messages';
import {RoadEventSelector} from '../RoadEventSelector';

export function NewRoadEventControl({onNewRoadEvent = noop}) {

    const [expanded, setExpanded] = useState(false);
    const {formatMessage} = useIntl();

    const handleRoadEventSelected = (...args) => {
        onNewRoadEvent(...args);
        setExpanded(false);
    };

    return (
        <div className="new-road-event-control">
            <SwipablePopup open={expanded}
                           onClose={() => setExpanded(false)}>
                <RoadEventSelector onRoadEventSelected={handleRoadEventSelected}
                                   onCancel={() => setExpanded(false)}/>
            </SwipablePopup>
            <div className="new-road-event-control-add-event-container">
                <Button className="new-road-event-control-add-event"
                        variant="primary"
                        onClick={() => setExpanded(true)}>
                    {formatMessage(messages.new_road_event)}
                </Button>
            </div>
        </div>
    );
}
