import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import {AxiosProvider} from './providers/AxiosProvider';
import {AuthProvider} from './providers/AuthProvider';
import {LocaleProvider} from './providers/LocaleProvider';
import {App} from './app/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <Router>
        <AxiosProvider>
            <AuthProvider>
                <LocaleProvider>
                    <App/>
                </LocaleProvider>
            </AuthProvider>
        </AxiosProvider>
    </Router>
), document.getElementById('root'));

serviceWorker.register();
