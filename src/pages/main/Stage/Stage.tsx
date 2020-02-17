import React, { useEffect, useMemo, SyntheticEvent } from 'react';
import useStageReducer, { touch, pick } from './stage.reducer';
import { useHandle } from '../../../hooks';
import Touch from './Touch';
import styles from './Stage.module.scss';

function Stage({ moveToIntro }: any) {
  const [{ touches, pickedId, masterId }, dispatch] = useStageReducer();

  const handleTouch = useHandle(
    (event: SyntheticEvent<HTMLDivElement, TouchEvent>) => {
      dispatch(
        touch(
          event.nativeEvent.type,
          Array.from(event.nativeEvent.changedTouches).map((touch: Touch) => [
            touch.identifier,
            touch.pageX,
            touch.pageY,
          ]),
        ),
      );
    },
  );

  const availHash = useMemo(
    () =>
      touches
        .filter(({ end }: any) => !end)
        .map(({ id }: any) => id)
        .join(','),
    [touches],
  );

  const handlePick = useHandle(() => dispatch(pick()));

  useEffect(() => {
    const timer = setTimeout(handlePick, 2000);
    return () => clearTimeout(timer);
  }, [availHash, handlePick]);

  return (
    <div
      className={styles.root}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouch}
      onTouchCancel={handleTouch}
    >
      {touches.map((touch: any) => (
        <Touch
          key={touch.id}
          {...touch}
          pickedId={pickedId}
          master={masterId === touch.id}
        />
      ))}
    </div>
  );
}

export default Stage;
