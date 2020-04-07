if (!Intl.PluralRules) {
    require('intl-pluralrules')
}

if (!Intl.RelativeTimeFormat) {
    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
    require('@formatjs/intl-relativetimeformat/dist/locale-data/ru');
}
