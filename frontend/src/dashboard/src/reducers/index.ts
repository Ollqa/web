import { combineReducers } from 'redux';
import security from 'common/src/reducers/security';
import auth from 'auth/src/reducers';
import users from 'users/src/reducers';
import config from './config';
import locale from './locale';
import me from 'profile/reducers/me';

import { connectRouter } from 'connected-react-router';

export const rootReducer = history =>
  combineReducers({
    auth,
    config,
    locale,
    me,
    router: connectRouter(history),
    security,
    users
  });
