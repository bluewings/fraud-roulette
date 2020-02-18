import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  SyntheticEvent,
} from 'react';
import useStageReducer, { touch, pick } from './stage.reducer';
import { useHandle } from '../../../hooks';
import Touch from './Touch';
import Aim from './Aim';
import styles from './Stage.module.scss';

const SIZE = 150;

function Stage({ moveToIntro, debug }: any) {
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

  const [targetId, setTargetId] = useState(null);
  const handleTargetChange = useHandle(setTargetId);

  const handlePick = useHandle(() => dispatch(pick(targetId)));

  useEffect(() => {
    const timer = setTimeout(handlePick, 2500);
    return () => clearTimeout(timer);
  }, [availHash, handlePick]);

  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) {
      const preventDefault = (event: any) => event.preventDefault();
      ref.current.addEventListener('touchstart', preventDefault);
      ref.current.addEventListener('touchmove', preventDefault);
    }
  }, []);

  return (
    <div ref={ref}>
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
            size={SIZE}
            debug={debug}
          />
        ))}
        <Aim
          touches={touches}
          masterId={masterId}
          size={SIZE}
          onTargetChange={handleTargetChange}
          debug={debug}
        />
      </div>
    </div>
  );
}

export default Stage;
