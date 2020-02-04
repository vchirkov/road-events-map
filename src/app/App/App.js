import './App.scss';

import React, {useState} from 'react';
import {Route, Switch, useHistory} from 'react-router';
import {useIntl} from 'react-intl';
import {toLonLat} from 'ol/proj';

import {Map} from '../Map';
import {LocationControl} from '../LocationControl';
import {NewRoadEventControl} from '../NewRoadEventControl';
import {RoadEventSelector} from '../RoadEventSelector';
import {Button} from '../../common/components/Button';

import {LocationPin} from '../LocationPin';

import {useView} from '../Map/hooks/useView';
import {useAddPin} from './useAddPin';

import {LOCATION_DEFAULT} from '../../common/constants';

import messages from './resources/messages';

export function App() {
    const history = useHistory();
    const {formatMessage} = useIntl();
    const [locationState, setLocationState] = useState(LOCATION_DEFAULT);
    const [view] = useView();
    const [payload, addPin] = useAddPin();

    const handleSubmitRoadEvent = async (type) => {
        const coordinates = toLonLat(view.getCenter());
        await addPin({type, coordinates});
        history.push('/');
    };

    return (
        <div className="app"
             style={{height: '100vh', width: '100%'}}>
            <Route path={['/new-road-event/:event', '/']}
                   render={({match}) => {
                       return <Map view={view}
                                   locationState={locationState}
                                   onLocationStateChange={setLocationState}
                                   showLocationLayer={!match.params.event}
                       />;
                   }}/>
            <div className="app-overlay">
                <Switch>
                    <Route path="/new-road-event/:event"
                           component={LocationPin}/>
                </Switch>
            </div>
            <div className="app-bottom-section">
                <Switch>
                    <Route path="/new-road-event/:event"
                           render={({match}) => (
                               <div className="app-send-road-event-controls">
                                   <Button className="app-submit-road-event"
                                           variant="primary"
                                           onClick={() => handleSubmitRoadEvent(match.params.event)}>
                                       {formatMessage(messages.send_an_event)}
                                   </Button>
                                   <Button className="app-cancel-road-event"
                                           variant="tertiary"
                                           onClick={() => history.push('/')}>
                                       {formatMessage(messages.cancel)}
                                   </Button>
                               </div>
                           )}/>
                    <Route path="/new-road-event"
                           render={() => (
                               <RoadEventSelector
                                   onRoadEventSelected={event => history.push(`/new-road-event/${event}`)}
                                   onCancel={() => history.push('/')}/>
                           )}/>
                    <Route path="/"
                           render={() => (
                               <>
                                   <LocationControl onChange={setLocationState}
                                                    state={locationState}/>
                                   <NewRoadEventControl onNewRoadEvent={() => history.push(`/new-road-event`)}/>
                               </>
                           )}/>
                </Switch>
            </div>
        </div>
    );
}
