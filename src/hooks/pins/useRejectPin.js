import useAxios from 'axios-hooks';

export function useRejectPin(options) {
    const [payload, execute] = useAxios({
        url: '/pins/reject',
        method: 'post',
        ...options
    }, {manual: true});
    return [(id) => execute({data: {id}}), payload];
}
