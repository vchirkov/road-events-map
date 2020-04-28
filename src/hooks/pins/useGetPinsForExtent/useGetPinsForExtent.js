import useAxios from 'axios-hooks';
import {useMemo} from 'react';
import {useIntl} from 'react-intl';
import {stringify} from 'query-string';
import {transformExtent} from 'ol/proj';

import {useToast} from '../../useToast';

import messages from './messages';

export function useGetPinsForExtent() {
    const {formatMessage} = useIntl();
    const toast = useToast();
    const [payload, exec] = useAxios({}, {manual: true});

    const execute = useMemo(() => async extent => {
        try {
            return await exec({
                url: `/pins/extent?${stringify({
                    extent: transformExtent(extent, 'EPSG:3857', 'EPSG:4326')
                })}`
            });
        } catch (e) {
            toast(formatMessage(messages.failed_to_update), {type: 'error'})
            throw e;
        }
    }, [exec]);

    return [payload, execute];
}
