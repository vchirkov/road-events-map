import {makeUseAxios} from 'axios-hooks';
import Axios from 'axios'

const axios = Axios.create({baseURL: process.env.REACT_APP_API});

export const useAxios = makeUseAxios({axios});
