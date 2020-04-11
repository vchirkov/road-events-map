import {useContext} from 'react';
import TrackLocationContext from '../contexts/TrackLocationContext';

const STATE_SEQUENCE = {
    [TrackLocationContext.TRACK_LOCATION_INACTIVE]: TrackLocationContext.TRACK_LOCATION_FOCUS,
    [TrackLocationContext.TRACK_LOCATION_FOCUS]: TrackLocationContext.TRACK_LOCATION_ROTATE,
    [TrackLocationContext.TRACK_LOCATION_ROTATE]: TrackLocationContext.TRACK_LOCATION_INACTIVE
};

export const useTrackLocation = () => {
    const [state, setState] = useContext(TrackLocationContext);

    const isRotate = state === TrackLocationContext.TRACK_LOCATION_ROTATE;
    const isFocus = state === TrackLocationContext.TRACK_LOCATION_FOCUS;
    const isInactive = state === TrackLocationContext.TRACK_LOCATION_INACTIVE;

    const setRotate = () => setState(TrackLocationContext.TRACK_LOCATION_ROTATE);
    const setFocus = () => setState(TrackLocationContext.TRACK_LOCATION_FOCUS);
    const setInactive = () => setState(TrackLocationContext.TRACK_LOCATION_INACTIVE);
    const toggleState = () => setState((s) => STATE_SEQUENCE[s]);

    return [{state, isRotate, isFocus, isInactive}, {setRotate, setFocus, setInactive, toggleState}]
};
