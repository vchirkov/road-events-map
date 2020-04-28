import useAxios from 'axios-hooks';
import {useMemo} from 'react';
import {throttle} from 'lodash';
import {stringify} from 'query-string';
import {transform} from 'ol/proj';

import {NOTIFCATION_REFRESH_THROTTLE} from '../../constants';

export function useGetPinsNear() {
    const [payload, execute] = useAxios({}, {manual: true});

    const execThrottled = useMemo(() => throttle((coords) => {
        const coordinates = transform(coords, 'EPSG:3857', 'EPSG:4326');
        return execute({url: `/pins/near?${stringify({coordinates})}`})
    }, NOTIFCATION_REFRESH_THROTTLE, {leading: true}), [execute]);

    return [payload, execThrottled];
}
