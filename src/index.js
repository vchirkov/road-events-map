import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import {HashRouter as Router} from 'react-router-dom';
import {AxiosProvider} from './providers/AxiosProvider';
import {AuthProvider} from './providers/AuthProvider';
import {App} from './app/App';

ReactDOM.render((
    <Router>
        <h1>Location</h1>
        <div>
            {JSON.stringify(window && window.location, null, '  ')}
        </div>
        <br/>
        <h1>TelegramGameProxy</h1>
        <div>
            {JSON.stringify(window.TelegramGameProxy && window.TelegramGameProxy.initParams, null, ' ')}
        </div>
        <AxiosProvider>
            <AuthProvider>
                <IntlProvider>
                    <App/>
                </IntlProvider>
            </AuthProvider>
        </AxiosProvider>
    </Router>
), document.getElementById('root'));
