import {useContext} from 'react';
import AxiosContext from './AxiosContext';

export const useAxiosInstance = () => useContext(AxiosContext);
