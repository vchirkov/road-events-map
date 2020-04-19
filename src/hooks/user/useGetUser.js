import {useEffect} from 'react';
import useAxios from 'axios-hooks';

export const useGetUser = (token) => {
    const [payload, execute] = useAxios({
        url: `/user`
    }, {manual: true});

    useEffect(() => {
        if (!token) return;
        execute()
    }, [token, execute]);

    return token ? payload?.data : null;
};
