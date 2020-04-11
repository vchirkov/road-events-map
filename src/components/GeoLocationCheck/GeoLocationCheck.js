import './GeoLocationCheck.scss';

import React, {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';

import messages from './resources/messages';

export function GeoLocationCheck({children}) {
    const {formatMessage} = useIntl();
    const [allowed, setAllowed] = useState(null);
    const [error, setError] = useState(null);
    const [blinkAwait, setBlinkAwait] = useState(true);

    const triggerGeolocationCheck = () => navigator.geolocation.watchPosition(setAllowed, setError);

    useEffect(() => {
        setTimeout(setBlinkAwait, 1000);
        triggerGeolocationCheck();
        document.addEventListener('visibilitychange', triggerGeolocationCheck);
        return () => document.removeEventListener('visibilitychange', triggerGeolocationCheck);
    }, []);

    if (allowed) {
        return children;
    }

    if (blinkAwait) {
        return null;
    }

    return (
        <>
            {children}
            <div className={classnames('geolocation-check', {'geolocation-check-hidden': allowed})}>
                {error ? (
                    <>
                        <h1 className="geolocation-check-header">
                            {formatMessage(messages.doesnt_know_location)}
                        </h1>
                        <p className="geolocation-check-message">
                            {formatMessage(messages.allow_in_settings)}
                        </p>
                    </>
                ) : (
                    <>
                        <div className="loader">
                            <div>
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                            </div>
                        </div>
                        <p>
                            {formatMessage(messages.fetching_position)}
                        </p>
                    </>
                )}
            </div>
        </>
    );
}
