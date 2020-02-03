import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createHashHistory as createHistory } from 'history';
import Root from './containers/desktop/Root';
import { configureStore } from './store';
import { initialState as login } from 'auth/src/pages/login/reducers';
import { initialState as registration } from 'auth/src/pages/registration/reducers';
import { initialState as security } from 'common/src/reducers/security';
import { usersList } from 'users/src/reducers/list';
import { initialState as me } from 'profile/reducers/me';
import { initialState as locale } from './reducers/locale';
import { initialState as config } from './reducers/config';
import './index.css';

const history = createHistory();
const { store, persistor } = configureStore(
  {
    auth: {
      login,
      registration
    },
    config,
    locale,
    me,
    security,
    users: { list: usersList }
  },
  history
);

ReactDOM.render(
  <Root store={store} persistor={persistor} history={history} />,
  document.getElementById('app')
);
