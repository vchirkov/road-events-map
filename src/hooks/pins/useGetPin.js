import useAxios from 'axios-hooks';
import {useEffect} from 'react';

export function useGetPin(id) {
    const [payload, execute] = useAxios(`/pins/${id}`, {
        manual: true
    });

    useEffect(() => {
        if (id) {
            execute();
        }
    }, [id]);

    return [payload, execute];
}
