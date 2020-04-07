import './RoadEvent.scss';

import React, {useEffect, useState} from 'react';
import classnames from 'classnames';
import {FormattedRelativeTime, useIntl} from 'react-intl';

import {Button} from '../Button';

import {useGetPin} from '../../hooks/pins/useGetPin';
import {useConfirmPin} from '../../hooks/pins/useConfirmPin';
import {useRejectPin} from '../../hooks/pins/useRejectPin';

import messages from './resources/messages';

function When({time}) {
    if (!time) {
        return null;
    }

    return (
        <span className="road-event-time">
            <FormattedRelativeTime value={(time - Date.now()) / 1000 | 0}
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
    const [pin, setPin] = useState(null);
    const {formatMessage} = useIntl();
    const [{data}] = useGetPin(id);
    const [confirmPin] = useConfirmPin();
    const [rejectPin] = useRejectPin();

    useEffect(() => setPin(data), [data]);

    if (!pin) {
        return null;
    }

    const createdAt = pin?.created_at;
    const type = pin?.type;
    const who = pin?.from;

    const classNames = classnames('road-event-heading', {
        [`road-event-heading-${type}`]: type
    });

    let intl = null;
    let rtf = null;
    let rtf1 = null;
    let day = null;
    let err = null;

    try {
        intl = Intl;
        rtf = Intl.RelativeTimeFormat;
        rtf1 = new Intl.RelativeTimeFormat('en', {style: 'narrow'});
        day = rtf1.format(-1, 'day');
    } catch (e) {
        err = e;
    }

    return (
        <div className="road-event">
            <div>
                <div>intl: {'' + !!intl}</div>
                <div>rtf: {'' + !!rtf}</div>
                <div>rtf1: {'' + !!rtf1}</div>
                <div>day: {day}</div>
                <div>err: {err && err.message}</div>
            </div>
            <h1 className={classNames}>
                {formatMessage(messages[type])}
            </h1>
            <div className="road-event-info">
                {formatMessage(messages.info, {
                    when: <When time={createdAt}/>,
                    who: <Who username={who?.username}/>
                })}
            </div>
            <div className="road-event-controls">
                <Button className="road-event-control road-event-control-reject"
                        variant="danger"
                        onClick={() => rejectPin(id).then(({data}) => setPin(data))}/>
                <Button className="road-event-control road-event-control-comments"
                        variant="primary"/>
                <Button className="road-event-control road-event-control-confirm"
                        variant="primary"
                        onClick={() => confirmPin(id).then(({data}) => setPin(data))}/>
            </div>
        </div>
    );
}
