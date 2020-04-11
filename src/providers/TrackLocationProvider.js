import React, {useState} from 'react';

import TrackLocationContext from '../contexts/TrackLocationContext'

export function TrackLocationProvider({children}) {
    const [state, setTrackLocation] = useState(TrackLocationContext.TRACK_LOCATION_DEFAULT);
    return (
        <TrackLocationContext.Provider value={[state, setTrackLocation]}>
            {children}
        </TrackLocationContext.Provider>
    );
}
