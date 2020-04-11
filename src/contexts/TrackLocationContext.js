import React from 'react';

const TRACK_LOCATION_INACTIVE = 'inactive';
const TRACK_LOCATION_FOCUS = 'focus';
const TRACK_LOCATION_ROTATE = 'rotate';

const TRACK_LOCATION_DEFAULT = TRACK_LOCATION_ROTATE;

const TrackLocationContext = React.createContext({state: TRACK_LOCATION_DEFAULT});

TrackLocationContext.TRACK_LOCATION_INACTIVE = TRACK_LOCATION_INACTIVE;
TrackLocationContext.TRACK_LOCATION_FOCUS = TRACK_LOCATION_FOCUS;
TrackLocationContext.TRACK_LOCATION_ROTATE = TRACK_LOCATION_ROTATE;
TrackLocationContext.TRACK_LOCATION_DEFAULT = TRACK_LOCATION_DEFAULT;

export default TrackLocationContext;
