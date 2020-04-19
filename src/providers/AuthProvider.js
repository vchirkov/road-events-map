import React, {useEffect, useContext, useState} from 'react';
import {useRouteMatch, useHistory} from 'react-router';

import AxiosContext from '../contexts/AxiosContext';
import AuthContext from '../contexts/AuthContext';
import {useGetUser} from '../hooks/user/useGetUser';

export function AuthProvider({children}) {
    const [token, setToken] = useState();

    const match = useRouteMatch('/auth/token/:token');
    const history = useHistory();
    const axios = useContext(AxiosContext);

    // set token from match
    useEffect(() => {
        setToken(match?.params?.token || token || localStorage.token);
    }, [match?.params?.token]);

    // set token header
    useEffect(() => {
        if (!token) return;
        history.replace('/');

        const intercept = axios.interceptors.request.use(config => {
            config.headers.authorization = token;
            return config;
        });

        return () => axios.interceptors.request.eject(intercept)

    }, [axios, token]);

    // remove isAuthenticated on 401
    useEffect(() => {
        axios.interceptors.response.use(config => config, error => {
            if (error?.response?.status === 401) {
                setToken(null);
            }
            return Promise.reject(error);
        });
    }, [axios]);

    const user = useGetUser(token);

    return (
        <AuthContext.Provider value={{user, isAuthenticated: !!token && user}}>
            {children}
        </AuthContext.Provider>
    );
}
