import {useState} from 'react';
import View from 'ol/View';

export function useView({zoom}) {
    const [view] = useState(new View({zoom}));
    return [view];
}
