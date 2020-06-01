import './AuthenticationCheck.scss';

import React from 'react';
import {useIntl} from 'react-intl';

import {Loader} from '../Loader';
import {Button} from '../Button';
import {useIsAuthenticated} from '../../hooks/user/useIsAuthenticated';

import messages from './messages';

const {REACT_APP_BOT_URL} = process.env;

export function AuthenticationCheck({children}) {

    const {formatMessage} = useIntl();
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            {isAuthenticated && children}
            {!isAuthenticated && (
                <div className="authentication-check">
                    {isAuthenticated === false ? (
                        <>
                            <h1 className="authentication-check-header">
                                {formatMessage(messages.cant_authenticate)}
                            </h1>
                            <p className="authentication-check-message">
                                {formatMessage(messages.open_in_telegram)}
                            </p>
                            <div className="authentication-check-open-bot">
                                <a href={REACT_APP_BOT_URL}>
                                    <Button variant="primary">
                                        {formatMessage(messages.open_bot)}
                                    </Button>
                                </a>
                            </div>
                        </>
                    ) : (
                        <>
                            <Loader/>
                            <p className="authentication-check-authenticating">
                                {formatMessage(messages.authenticating)}
                            </p>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
