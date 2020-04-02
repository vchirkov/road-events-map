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
        <AxiosProvider>
            <AuthProvider>
                <IntlProvider>
                    <App/>
                </IntlProvider>
            </AuthProvider>
        </AxiosProvider>
    </Router>
), document.getElementById('root'));
