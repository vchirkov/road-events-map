import './NewRoadEventControl.scss';

import React from 'react';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router';

import {Button} from '../Button';

import messages from './resources/messages';

export function NewRoadEventControl() {
    const {formatMessage} = useIntl();
    const history = useHistory();

    return (
        <div className="new-road-event-control">
            <div className="new-road-event-control-add-event-container">
                <Button className="new-road-event-control-add-event"
                        variant="primary"
                        onClick={() => history.push(`/new-road-event`)}>
                    {formatMessage(messages.new_road_event)}
                </Button>
            </div>
        </div>
    );
}
