import useAxios from 'axios-hooks';

export function useAddPin(options) {
    const [payload, execute] = useAxios({
        url: '/pins/add',
        method: 'post',
        ...options
    }, {manual: true});
    return [async ({type, coordinates}) => {
        const {data} = await execute({data: {type, coordinates}});
        return data;
    }, payload];
}
