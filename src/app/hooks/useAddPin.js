import useAxios from 'axios-hooks';

export const useAddPin = (options) => {
    const [payload, execute] = useAxios({
        url: '/pins',
        method: 'post',
        ...options
    }, {manual: true});
    return [payload, ({type, coordinates}) => execute({data: {type, coordinates}})];
};
