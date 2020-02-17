import React, { useEffect, useMemo, useRef } from 'react';
import { useWindowSize } from 'react-use';
import styles from './Picked.module.scss';

function Picked(props: any) {
  const { width, height } = useWindowSize();
  const { color, x, y, end, size } = props;

  const radius = useMemo(() => Math.max(width, height), [width, height]);

  const ref = useRef<any>();

  useEffect(() => {
    if (ref.current) {
      ref.current.style.strokeWidth = end ? 0 : `${radius * 2 - (size + 50)}px`;
    }
  }, [radius, end, size]);

  return (
    <div
      className={styles.root}
      style={{
        top: -height + y,
        left: -width + x,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={width * 2}
        height={height * 2}
        viewBox={`0 0 ${width * 2} ${height * 2}`}
      >
        <circle
          cx={width}
          cy={height}
          r={radius}
          ref={ref}
          className={styles.focus}
          stroke={color}
          strokeWidth={0}
        />
      </svg>
    </div>
  );
}

export default Picked;
