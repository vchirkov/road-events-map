import './Button.scss';

import React from 'react';
import classnames from 'classnames';

export function Button({className, children, variant, ...other}) {

    const classNames = classnames('btn', className, {
        [`btn-${variant}`]: variant
    });

    return (
        <button {...other}
                className={classNames}>
            {children}
        </button>
    )
}
