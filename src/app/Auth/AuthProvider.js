import React, {useEffect, useContext} from 'react';
import {useRouteMatch, useHistory} from 'react-router';

import AxiosContext from '../Axios/AxiosContext';
import AuthContext from './AuthContext';
import {useGetUser} from './useGetUser';

export function AuthProvider({children}) {
    const match = useRouteMatch('/auth/token/:token');
    const history = useHistory();
    const axios = useContext(AxiosContext);
    const token = match && match.params.token || 152018200;

    useEffect(() => {
        if (!token) return;
        history.replace('/');
        axios.interceptors.request.use(config => {
            config.headers.authorization = token;
            return config;
        }, error => Promise.reject(error));

    }, [token]);

    const user = useGetUser(token);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}
