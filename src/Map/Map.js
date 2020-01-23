import './Map.scss';

import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';

import {Button} from '../common/components/Button';

import {useView} from './hooks/useView';
import {useTileLayer} from './hooks/useTileLayer';
import {useMarkerLayer} from './hooks/useMarkerLayer';
import {useMap} from './hooks/useMap';
import {useLocation} from './hooks/useLocation';
import {LocationControl} from './components/LocationControl';
import {NewRoadEventControl} from './components/NewRoadEventControl';
import {LocationPin} from './components/LocationPin';

import {
    LOCATION_DEFAULT,
    LOCATION_INACTIVE
} from '../common/constants';

import messages from './resources/messages';

export function Map(props = {}) {
    const {zoom = 16} = props;

    const {formatMessage} = useIntl();
    const [locationState, setLocationState] = useState(LOCATION_DEFAULT);
    const [currentRoadEvent, setCurrentRoadEvent] = useState(null);
    const [view] = useView({zoom});
    const [tileLayer] = useTileLayer();
    const [markerLayer] = useMarkerLayer();
    const [locationLayer] = useLocation(view, locationState, setLocationState);

    const [map, {setRef}] = useMap({
        view,
        layers: [
            tileLayer,
            markerLayer,
            locationLayer
        ],
    });

    const setLocationInactive = () => setLocationState(LOCATION_INACTIVE);
    const handleSubmitRoadEvent = () => {
        setCurrentRoadEvent(null);
    };

    useEffect(() => view.setZoom(zoom), [zoom, view]);
    useEffect(() => {
        map.on('pointerdrag', setLocationInactive);
        return () => map.un('pointerdrag', setLocationInactive);
    }, [map]);
    useEffect(() => {
        locationLayer.setVisible(!currentRoadEvent);
    }, [currentRoadEvent]);

    return (
        <div className="map">
            <div className="map-block"
                 style={{height: '100vh', width: '100%'}}
                 ref={setRef}>
            </div>


            {currentRoadEvent ? (
                <>
                    <LocationPin/>
                    <div className="map-bottom-section">
                        <div className="map-send-road-event-controls">

                            <Button className="map-submit-road-event"
                                    variant="primary"
                                    onClick={handleSubmitRoadEvent}>
                                {formatMessage(messages.send_an_event)}
                            </Button>
                            <Button className="map-cancel-road-event"
                                    variant="tertiary"
                                    onClick={handleSubmitRoadEvent}>
                                {formatMessage(messages.cancel)}
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="map-bottom-section">
                    <LocationControl onChange={setLocationState}
                                     state={locationState}/>
                    <NewRoadEventControl onNewRoadEvent={setCurrentRoadEvent}/>
                    <div/>

                </div>
            )}
        </div>
    );
}
