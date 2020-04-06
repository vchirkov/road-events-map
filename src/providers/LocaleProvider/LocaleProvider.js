import React from 'react';
import {IntlProvider} from 'react-intl';
import {useUser} from '../../hooks/user/useUser';

export function LocaleProvider({children}) {
    const user = useUser();

    return (
        <IntlProvider locale={user?.language_code}
                      defaultLocale="en">
            {children}
        </IntlProvider>
    );
}
