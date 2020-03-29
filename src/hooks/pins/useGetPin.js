import useAxios from 'axios-hooks';

export function useGetPin(id) {
    return useAxios(`/pins/${id}`);
}
