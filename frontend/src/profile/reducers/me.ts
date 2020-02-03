import { createReducer } from 'utils/reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as actions from '../constants';
import { logout } from 'common/src/constants/security';

export const initialState = {
  id: '',
  email: '',
  profile: {
    firstName: '',
    lastName: ''
  },
  errors: {},
  formFields: {firstName: '',lastName: ''}
};

const reducer = createReducer(initialState, {
  [actions.load]: (state, { user }) => ({ ...state, ...user }),
  [actions.clear]: () => initialState,
  [actions.clearProfile]: state => ({
    ...state,
    formFields: initialState.formFields
  }),
  [logout]: () => initialState,
  [actions.changeProfile]: (state, { field, value }) => ({
    ...state,
    formFields: { ...state.formFields, [field]: value },
    errors: {
      ...state.errors,
      [field]: ''
    }
  }),
  [actions.setErrors]: (state, { errors }) => ({ ...state, errors })
});

export default persistReducer(
  {
    storage,
    key: 'me',
    keyPrefix: 'aunited',
    version: 1
  },
  reducer
);
