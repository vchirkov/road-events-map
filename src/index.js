import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import './index.scss';
import {App} from './App';

ReactDOM.render((
    <IntlProvider>
        <App/>
    </IntlProvider>
), document.getElementById('root'));
