import {useMemo} from 'react';
import useAxios from 'axios-hooks';
import {useIntl} from 'react-intl';

import {useToast} from '../../useToast';

import messages from './messages';

export function useAddPin(options) {
    const {formatMessage} = useIntl();
    const toast = useToast();

    const [payload, exec] = useAxios({
        url: '/pins/add',
        method: 'post',
        ...options
    }, {manual: true});

    const execute = useMemo(() => async ({type, coordinates}) => {
        try {
            return await exec({data: {type, coordinates}});
        } catch (e) {
            toast(formatMessage(messages.failed_to_add_pin), {type: 'error'});
            throw e;
        }
    }, [exec]);

    return [execute, payload];
}
