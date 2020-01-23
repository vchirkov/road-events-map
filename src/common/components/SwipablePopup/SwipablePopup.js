import './SwipablePopup.scss';

import React, {useState, useLayoutEffect} from 'react';
import {Swipeable} from 'react-swipeable';
import classnames from 'classnames';
import {noop} from 'lodash';

export function SwipablePopup({open = false, onClose = noop, children}) {
    const [popupState, setPopupState] = useState('closed');
    const classNames = classnames('swipable-popup', `swipable-popup-${popupState}`);

    useLayoutEffect(() => {
        if (open) {
            setPopupState('open');
        } else if (popupState !== 'closed') {
            setPopupState('closing');
        }
    }, [open]);

    return (
        <Swipeable className={classNames}
                   onSwipedDown={() => onClose()}>
            <div className="swipable-popup-content"
                 onTransitionEnd={() => setPopupState('closed')}>
                {popupState !== 'closed' && (
                    children
                )}
            </div>
        </Swipeable>
    )
}
