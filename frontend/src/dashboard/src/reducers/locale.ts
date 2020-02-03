import { createReducer } from 'utils/reducer';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/locale-data/ru'

export const initialState = {
  locale: 'ru'
};

export default createReducer(initialState, {});
