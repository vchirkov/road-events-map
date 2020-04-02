import React, {useEffect, useContext, useState} from 'react';
import {useRouteMatch, useHistory} from 'react-router';

import AxiosContext from '../contexts/AxiosContext';
import AuthContext from '../contexts/AuthContext';
import {useGetUser} from '../hooks/user/useGetUser';

export function AuthProvider({children}) {
    const match = useRouteMatch('/auth/token/:token');
    const history = useHistory();
    const axios = useContext(AxiosContext);
    const [token, setToken] = useState();

    useEffect(() => {
        setToken(match?.params?.token || token || localStorage.token);
    }, [match?.params?.token]);

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
            {<div>
                <h1>
                    token
                </h1>
                <div>
                    {token}
                </div>
            </div>}
            {children}
        </AuthContext.Provider>
    );
}
