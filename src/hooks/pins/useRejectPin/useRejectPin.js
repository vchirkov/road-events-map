import useAxios from 'axios-hooks';
import {useMemo} from 'react';
import {useIntl} from 'react-intl';
import {useToast} from '../../useToast';

import messages from './messages';

export function useRejectPin(options) {
    const {formatMessage} = useIntl();
    const toast = useToast();

    const [payload, exec] = useAxios({
        url: '/pins/reject',
        method: 'post',
        ...options
    }, {manual: true});

    const execute = useMemo(() => async id => {
        try {
            return await exec({data: {id}});
        } catch (e) {
            toast(formatMessage(messages.failed_to_reject), {type: 'error'});
            throw e;
        }
    }, [exec]);

    return [execute, payload];
}
