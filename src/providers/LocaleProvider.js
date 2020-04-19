import React from 'react';
import {IntlProvider} from 'react-intl';
import {useUser} from '../hooks/user/useUser';

import en from '../translations/en.json';
import ru from '../translations/ru.json';

const MESSAGES = {en, ru};
const DEFAULT_LOCALE = 'en';

export function LocaleProvider({children}) {
    const user = useUser();

    const locale = user?.language_code || navigator?.language.split(/[-_]/)[0] || DEFAULT_LOCALE;

    return (
        <IntlProvider locale={locale}
                      messages={MESSAGES[locale]}
                      defaultLocale={DEFAULT_LOCALE}>
            {children}
        </IntlProvider>
    );
}
