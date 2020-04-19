import {useContext} from 'react';
import AuthContext from '../../contexts/AuthContext';

export const useIsAuthenticated = () => useContext(AuthContext)?.isAuthenticated;
