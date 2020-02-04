import React from 'react';
import {configure} from 'axios-hooks';
import Axios from 'axios';
import AxiosContext from './AxiosContext';
import {useMemo} from 'react';

export function AxiosProvider(props = {}) {
    const {
        baseURL = process.env.REACT_APP_API_BASE_URL,
        children
    } = props;

    const axios = useMemo(() => {
        const axios = Axios.create({
            baseURL,
        });
        configure({axios});
        return axios;
    }, [baseURL]);

    return (
        <AxiosContext.Provider value={axios}>
            {children}
        </AxiosContext.Provider>
    );
}
