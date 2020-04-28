import {useMemo} from 'react';
import useAxios from 'axios-hooks';
import {useIntl} from 'react-intl';

import {useToast} from '../../useToast';

import messages from './messages';

export function useConfirmPin(options) {
    const {formatMessage} = useIntl();
    const toast = useToast();

    const [payload, exec] = useAxios({
        url: '/pins/confirm',
        method: 'post',
        ...options
    }, {manual: true});

    const execute = useMemo(() => async id => {
        try {
            return await exec({data: {id}});
        } catch (e) {
            toast(formatMessage(messages.failed_to_confirm), {type: 'error'});
            throw e;
        }
    }, [exec]);

    return [execute, payload];
}
