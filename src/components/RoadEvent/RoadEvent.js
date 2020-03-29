import './RoadEvent.scss';

import React from 'react';
import classnames from 'classnames';
import {FormattedRelativeTime, useIntl} from 'react-intl';

import {Button} from '../Button';

import {useGetPin} from '../../hooks/pins/useGetPin';
import {useConfirmPin} from '../../hooks/pins/useConfirmPin';

import messages from './resources/messages';

function When({updatedAt}) {
    if (!updatedAt) {
        return null;
    }

    return (
        <span className="road-event-time">
            <FormattedRelativeTime value={(updatedAt - Date.now()) / 1000}
                                   numeric="auto"
                                   updateIntervalInSeconds={60}/>
        </span>
    );
}

function Who({username}) {
    if (!username) {
        return null;
    }

    return (
        <span className="road-event-name">
            {username}
        </span>
    );
}

export function RoadEvent({id}) {
    const {formatMessage} = useIntl();
    const [{data, loading, error}] = useGetPin(id);
    const [confirmPin] = useConfirmPin();

    if (!data) {
        return null;
    }

    const updatedAt = data?.updated_at;
    const type = data?.type;
    const who = data?.from;
    const classNames = classnames('road-event-heading', {
        [`road-event-heading-${type}`]: type
    });

    return (
        <div className="road-event">
            <h1 className={classNames}>
                {formatMessage(messages[type])}
            </h1>
            <div className="road-event-info">
                {formatMessage(messages.info, {
                    when: <When updatedAt={updatedAt}/>,
                    who: <Who username={who?.username}/>
                })}
            </div>
            <div className="road-event-controls">
                <Button className="road-event-control road-event-control-reject"
                        variant="danger"/>
                <Button className="road-event-control road-event-control-comments"
                        variant="primary"/>
                <Button className="road-event-control road-event-control-confirm"
                        variant="primary"/>
            </div>
        </div>
    );
}
