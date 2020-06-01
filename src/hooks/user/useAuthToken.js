import {useContext} from 'react';
import AuthContext from '../../contexts/AuthContext';

export const useAuthToken = () => useContext(AuthContext)?.token;
