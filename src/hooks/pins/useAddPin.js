import useAxios from 'axios-hooks';

export function useAddPin(options) {
    const [payload, execute] = useAxios({
        url: '/pins/add',
        method: 'post',
        ...options
    }, {manual: true});
    return [({type, coordinates}) => execute({data: {type, coordinates}}), payload];
}
