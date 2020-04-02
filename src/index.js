import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import {HashRouter as Router} from 'react-router-dom';
import {AxiosProvider} from './providers/AxiosProvider';
import {AuthProvider} from './providers/AuthProvider';
import {App} from './app/App';

const loc = JSON.stringify(window && window.location, null, '  ');
const init = JSON.stringify(window.TelegramGameProxy && window.TelegramGameProxy.initParams, null, ' ');
ReactDOM.render((
    <div>
        <h1>Location</h1>
        <div>
            {loc}
        </div>
        <br/>
        <h1>TelegramGameProxy</h1>
        <div>
            {init}
        </div>
        <Router>
            <AxiosProvider>
                <AuthProvider>
                    <IntlProvider>
                        <App/>
                    </IntlProvider>
                </AuthProvider>
            </AxiosProvider>
        </Router>
    </div>
), document.getElementById('root'));
