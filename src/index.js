import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.scss';
import {App} from './app/App';

ReactDOM.render((
    <IntlProvider>
        <Router>
            <App/>
        </Router>
    </IntlProvider>
), document.getElementById('root'));
