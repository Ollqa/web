import { Action, AnyAction } from 'redux';

type Reducers<TState, TType extends string> = {
  readonly [Type in TType]: (state: TState, action: AnyAction) => TState;
};

export const createReducer = <
  TState,
  TType extends string,
  TAction extends Action<TType>
>(
  initialState: TState,
  reducers: Reducers<TState, TType>
) => (state = initialState, action: TAction) => {
  const handler = reducers[action.type];
  const newState = handler ? handler(state, action) : state;

  return newState;
};
