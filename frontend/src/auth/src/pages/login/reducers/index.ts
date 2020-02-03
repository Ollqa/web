import { createReducer } from 'utils/reducer';
import * as actions from '../constants';

export const initialState = {
  email: '',
  password: '',
  errors: {}
};

export default createReducer(initialState, {
  [actions.change]: (state, { field, value }) => ({
    ...state,
    [field]: value,
    errors: { ...state.errors, [field]: '' }
  }),
  [actions.setErrors]: (state, { errors }) => ({ ...state, errors }),
  [actions.clear]: () => initialState
});
