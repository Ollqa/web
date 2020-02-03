import { createReducer } from 'utils/reducer';

export const initialState = {
  apiUrl: process.env.API_URL || 'http://localhost:3001/graphql'
};

export default createReducer(initialState, {});
