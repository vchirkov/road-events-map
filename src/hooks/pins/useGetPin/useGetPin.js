import {useMemo} from 'react';
import useAxios from 'axios-hooks';
import {useEffect} from 'react';
import {useIntl} from 'react-intl';

import {useToast} from '../../useToast';

import messages from './messages';

export function useGetPin(id) {
    const {formatMessage} = useIntl();
    const toast = useToast();

    const [payload, exec] = useAxios(`/pins/${id}`, {
        manual: true
    });

    const execute = useMemo(() => async () => {
        try {
            return await exec();
        } catch (e) {
            toast(formatMessage(messages.failed_to_get_pin), {type: 'error'});
            throw e;
        }
    }, [exec]);

    useEffect(() => {
        if (!id) return;
        execute();
    }, [id]);

    return [payload, execute];
}
