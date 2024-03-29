import './index.scss';
import './util/intlPolyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import {AxiosProvider} from './providers/AxiosProvider';
import {AuthProvider} from './providers/AuthProvider';
import {LocaleProvider} from './providers/LocaleProvider';
import {TrackLocationProvider} from './providers/TrackLocationProvider';
import {GeoLocationCheck} from './components/GeoLocationCheck';
import {AuthenticationCheck} from './components/AuthenticationCheck';
import {App} from './app/App';

ReactDOM.render((
    <Router>
        <AxiosProvider>
            <AuthProvider>
                <LocaleProvider>
                    <AuthenticationCheck>
                        <GeoLocationCheck>
                            <TrackLocationProvider>
                                <App/>
                            </TrackLocationProvider>
                        </GeoLocationCheck>
                    </AuthenticationCheck>
                </LocaleProvider>
            </AuthProvider>
        </AxiosProvider>
    </Router>
), document.getElementById('root'));

serviceWorker.register();
