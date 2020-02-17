import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
  count: 0,
} as {
  count: number;
};

const INCREASE = 'app/INCREASE';

export const increase = createAction(INCREASE, () => null);

export default handleActions(
  {
    [INCREASE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.count++;
      }),
  },
  initialState,
);
