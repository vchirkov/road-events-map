import {useState, useEffect} from 'react';
import {differenceBy} from 'lodash';

import {useGetPinsNear} from '../pins/useGetPinsNear';
import {useAudio} from '../useAudio';

import url from '../resources/notify.mp3';
import {useGeolocation} from './useGeolocation';

export function useNotifyOnPinsNear(view) {
    const [currentPins, setCurrentPins] = useState([]);
    const [{position}, setLocation] = useState({});
    const [{data}, getPins] = useGetPinsNear();
    const play = useAudio(url);

    useGeolocation(view, setLocation);

    useEffect(() => {
        if (!position) return;
        getPins(position);
    }, [position]);

    useEffect(() => {
        if (differenceBy(data, currentPins, '_id').length !== 0) {
            play();
        }
        setCurrentPins(data);
    }, [data, currentPins])
}
