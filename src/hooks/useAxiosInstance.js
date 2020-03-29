import {useContext} from 'react';
import AxiosContext from '../contexts/AxiosContext';

export const useAxiosInstance = () => useContext(AxiosContext);
