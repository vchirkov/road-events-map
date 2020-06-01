import './GeoLocationCheck.scss';

import React, {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';

import {Loader} from '../Loader';

import {useAuthToken} from '../../hooks/user/useAuthToken';

import messages from './messages';

export function GeoLocationCheck({children}) {
    const token = useAuthToken();
    const {formatMessage} = useIntl();
    const [allowed, setAllowed] = useState(null);
    const [error, setError] = useState(null);
    const [blinkAwait, setBlinkAwait] = useState(true);

    const triggerGeolocationCheck = () => navigator.geolocation.watchPosition(setAllowed, setError, {
        enableHighAccuracy: true,
        timeout: 5000
    });

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
            {!allowed && (
                <div className="geolocation-check">
                    {error ? (
                        <>
                            <h1 className="geolocation-check-header">
                                {formatMessage(messages.doesnt_know_location)}
                            </h1>
                            <p className="geolocation-check-message">
                                {formatMessage(messages.allow_in_settings_or_open_external, {
                                    or: text => <div className="geolocation-check-or">{text}</div>,
                                    ref: text => (
                                        <a className="geolocation-check-ref"
                                           href={`/#/auth/token/${token}`}
                                           target="_blank">
                                            {text}
                                        </a>
                                    )
                                })}
                            </p>
                        </>
                    ) : (
                        <>
                            <Loader/>
                            <p>
                                {formatMessage(messages.fetching_position)}
                            </p>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
