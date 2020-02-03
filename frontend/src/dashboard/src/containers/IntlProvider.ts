import { createElement } from 'react';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/locale-data/ru';
import '@formatjs/intl-relativetimeformat/dist/locale-data/en';

export default ({ children }) =>
  createElement(
    IntlProvider,
    {
      defaultLocale: 'ru',
      locale: 'ru'
    },
    children
  );
