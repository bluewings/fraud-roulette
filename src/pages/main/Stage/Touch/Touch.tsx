import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Picked from './Picked';
import styles from './Touch.module.scss';

const SIZE = 150;

function Touch(props: any) {
  const { id, x, y, color, end, pickedId, isPicked, master } = props;

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const hidden = (pickedId && pickedId !== id) || end;
  return (
    <>
      {isPicked && <Picked {...props} size={SIZE} />}
      <div
        className={cx(
          styles.circle_wrap,
          ready && styles.ready,
          hidden && styles.end,
          !hidden && styles.animate,
          isPicked && styles.picked,
        )}
        style={{ top: y - SIZE / 2, left: x - SIZE / 2 }}
      >
        <div className={cx(styles.circle, master && styles.master)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={SIZE}
            height={SIZE}
            viewBox="0 0 140 140"
          >
            {ready && (
              <>
                <circle
                  cx="70"
                  cy="70"
                  r="52.5"
                  stroke={color}
                  className={styles.arc}
                />
                <circle
                  cx="70"
                  cy="70"
                  r="52.5"
                  stroke={color}
                  className={styles.arc_bg}
                />
              </>
            )}
            <circle
              className={styles.inner}
              cx="70"
              cy="70"
              r="35"
              fill={color}
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default Touch;
