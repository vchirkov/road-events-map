import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.scss';
import {AxiosProvider} from './app/Axios';
import {AuthProvider} from './app/Auth';
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
