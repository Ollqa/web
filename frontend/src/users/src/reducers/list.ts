import { createReducer } from 'utils/reducer';
import * as actions from '../constants/list';

export const usersList = {
  rows: [],
  count: 0
};

export default createReducer(usersList, {
  [actions.load]: (state, { list }) => ({ ...state, ...list }),
  [actions.clear]: () => usersList
});
