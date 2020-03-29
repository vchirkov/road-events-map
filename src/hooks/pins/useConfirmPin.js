import useAxios from 'axios-hooks';

export function useConfirmPin(options) {
    const [payload, execute] = useAxios({
        url: '/pins/confirm',
        method: 'post',
        ...options
    }, {manual: true});
    return [(id) => execute({data: {id}}), payload];
}
