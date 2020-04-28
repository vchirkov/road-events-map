import './App.scss';

import React from 'react';
import {Route, Switch, useHistory} from 'react-router';
import {useIntl} from 'react-intl';
import {toLonLat} from 'ol/proj';

import {Map} from '../../components/Map';
import {LocationControl} from '../../components/LocationControl';
import {NewRoadEventControl} from '../../components/NewRoadEventControl';
import {RoadEvent} from '../../components/RoadEvent';
import {RoadEventSelector} from '../../components/RoadEventSelector';
import {LocationPin} from '../../components/LocationPin';
import {Button} from '../../components/Button';

import {useView} from '../../hooks/map/useView';
import {useTileLayer} from '../../hooks/map/useTileLayer';
import {useMarkerLayer} from '../../hooks/map/useMarkerLayer';
import {useNotifyOnPinsNear} from '../../hooks/map/useNotifyOnPinsNear';
import {useAddPin} from '../../hooks/pins/useAddPin';

import messages from './messages';

export function App() {
    const history = useHistory();
    const {formatMessage} = useIntl();
    const [view] = useView();
    const [tileLayer] = useTileLayer();
    const [markerLayer, {refresh}] = useMarkerLayer();
    const [addPin] = useAddPin();

    useNotifyOnPinsNear(view);

    const handleSubmitRoadEvent = async (type) => {
        const coordinates = toLonLat(view.getCenter());
        const pin = await addPin({type, coordinates});
        refresh();
        history.push(`/road-events/${pin._id}`);
    };

    const handleShowRoadEvent = (id) => {
        if (id) {
            history.push(`/road-events/${id}`);
        } else {
            history.push('/');
        }
    };

    return (
        <div className="app"
             style={{height: '100vh', width: '100%'}}>
            <Map view={view}
                 tileLayer={tileLayer}
                 markerLayer={markerLayer}
                 onFeatureSelect={handleShowRoadEvent}/>
            <div className="app-overlay">
                <Switch>
                    <Route path="/new-road-event/:event"
                           component={LocationPin}/>
                </Switch>
            </div>
            <div className="app-top-section">
                <Switch>
                    <Route path="/road-events/:id"
                           render={({match}) => (
                               <RoadEvent id={match.params.id}/>
                           )}/>
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
                           component={RoadEventSelector}/>
                    <Route path="/"
                           render={() => (
                               <div className="app-initial-controls">
                                   <LocationControl/>
                                   <NewRoadEventControl/>
                               </div>
                           )}/>
                </Switch>
            </div>
        </div>
    );
}
