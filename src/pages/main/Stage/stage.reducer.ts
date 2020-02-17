import { createAction } from 'redux-actions';
import { useImmerReducer } from 'use-immer';
import { get } from 'lodash-es';
import { getColor } from '../../../helpers/util';

const initialState = {
  pickedId: null,
  masterId: null,
  touches: [],
  _touches: {},
};

const TOUCH = 'stage/TOUCH';
const PICK = 'stage/PICK';

const MIN_DISTANCE = 10;
const MAX_DISTANCE = 200;

export const touch = createAction(
  TOUCH,
  (eventType: string, changedTouches: any[]) => ({ eventType, changedTouches }),
);

export const pick = createAction(PICK, () => null);

const timestamp = () => new Date().valueOf();

const reducer = (draft: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case TOUCH: {
      const now = timestamp();
      const { eventType, changedTouches } = payload;
      Object.entries(draft._touches).forEach(([k, v]: any) => {
        if (v.end && v.end + 2000 < now) {
          delete draft._touches[k];
        }
      });
      if (eventType === 'touchstart') {
        changedTouches.forEach(([id, x, y]: any) => {
          draft._touches[id] = {
            id,
            color: getColor(),
            x,
            y,
            start: now,
            _x: x,
            _y: y,
            _min_x: x,
            _max_x: x,
            _min_y: y,
            _max_y: y,
            _dist: 0,
          };
        });
      } else if (eventType === 'touchmove') {
        changedTouches.forEach(([id, x, y]: any) => {
          if (draft._touches[id]) {
            draft._touches[id].x = x;
            draft._touches[id].y = y;
            if (draft._touches[id]._min_x > x) draft._touches[id]._min_x = x;
            if (draft._touches[id]._max_x < x) draft._touches[id]._max_x = x;
            if (draft._touches[id]._min_y > y) draft._touches[id]._min_y = y;
            if (draft._touches[id]._max_y < y) draft._touches[id]._max_y = y;
            draft._touches[id]._dist = Math.sqrt(
              Math.pow(
                draft._touches[id]._max_x - draft._touches[id]._min_x,
                2,
              ) +
                Math.pow(
                  draft._touches[id]._max_y - draft._touches[id]._min_y,
                  2,
                ),
            );
          }
        });
      } else {
        changedTouches.forEach(([id, x, y]: any) => {
          if (draft._touches[id]) {
            draft._touches[id].end = now;
          }
        });
      }
      draft.touches = Object.values(draft._touches);

      draft.masterId = get(
        [
          ...draft.touches.filter(
            ({ end, _dist }: any) =>
              !end && MIN_DISTANCE < _dist && _dist < MAX_DISTANCE,
          ),
        ].sort((a: any, b: any) => {
          if (a._dist === b._dist) {
            return 0;
          }
          return a._dist < b._dist ? 1 : -1;
        }),
        [0, 'id'],
        null,
      );

      if (
        !draft.touches.find(({ id, end }: any) => id === draft.pickedId && !end)
      ) {
        draft.pickedId = null;
      }
      return;
    }
    case PICK: {
      draft.touches = Object.values(draft._touches);
      const availTouches = draft.touches.filter(({ end }: any) => !end);
      if (draft.pickedId === null && availTouches.length > 1) {
        draft.pickedId = get(availTouches, [
          ~~(Math.random() * availTouches.length),
          'id',
        ]);
        draft.touches.forEach((e: any) => {
          if (e.id === draft.pickedId) {
            e.isPicked = true;
          } else {
            delete e.isPicked;
          }
        });
      }
      return;
    }
  }
};

function useStageReducer(data?: any) {
  return useImmerReducer(reducer, data || initialState);
}

export default useStageReducer;
