import './NewRoadEventControl.scss';

import React from 'react';
import {useIntl} from 'react-intl';
import {noop} from 'lodash';

import {Button} from 'common/components/Button';

import messages from './resources/messages';

export function NewRoadEventControl({onNewRoadEvent = noop}) {
    const {formatMessage} = useIntl();

    return (
        <div className="new-road-event-control">
            <div className="new-road-event-control-add-event-container">
                <Button className="new-road-event-control-add-event"
                        variant="primary"
                        onClick={onNewRoadEvent}>
                    {formatMessage(messages.new_road_event)}
                </Button>
            </div>
        </div>
    );
}
