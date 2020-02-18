import React, { useEffect, useMemo, useRef } from 'react';
import { useWindowSize } from 'react-use';
import { get } from 'lodash-es';
import styles from './Aim.module.scss';

function Aim({ touches, masterId, size, onTargetChange, debug }: any) {
  const { width, height } = useWindowSize();

  const master = useMemo(() => touches.find(({ id }: any) => id === masterId), [
    touches,
    masterId,
  ]);

  const rifle = useMemo(() => {
    if (master) {
      const stretch = Math.max(width, height);
      const a = { x: width / 2, y: height / 2 };
      const b = {
        x: a.x + (master.x - master._x) * stretch,
        y: a.y + (master.y - master._y) * stretch,
      };
      return (p: any) => {
        const atob = { x: b.x - a.x, y: b.y - a.y };
        const atop = { x: p.x - a.x, y: p.y - a.y };
        const len = atob.x * atob.x + atob.y * atob.y;
        let distance = atop.x * atob.x + atop.y * atob.y;
        const t = Math.min(1, Math.max(0, distance / len));
        distance = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
        return t > 0
          ? {
              _anchor: { x: a.x + atob.x * t, y: a.y + atob.y * t },
              _distance: ~~Math.sqrt(~~Math.abs(distance)),
            }
          : {};
      };
    }
    return () => {};
  }, [width, height, master]);

  const ref = useRef<any>();

  const [targetId, targets] = useMemo(() => {
    const targets = touches
      .map((e: any) => ({ ...e, ...rifle({ x: e.x, y: e.y }) }))
      .filter((e: any) => e._anchor && !e.end)
      .sort((a: any, b: any) =>
        a._distance === b._distance ? 0 : a._distance > b._distance ? 1 : -1,
      );

    return [get(targets, [0, 'id'], null), targets];
  }, [rifle, touches]);

  useEffect(() => {
    onTargetChange(targetId);
  }, [onTargetChange, targetId]);

  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      if (debug && master) {
        const cx = width / 2;
        const cy = height / 2;
        const x = master.x - master._x;
        const y = master.y - master._y;
        const m = Math.max(width, height);
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + x * m, cy + y * m);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#fff';
        ctx.setLineDash([6, 6]);
        ctx.stroke();

        targets.forEach(({ x, y, _anchor, _distance }: any, i: number) => {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(_anchor.x, _anchor.y);
          ctx.lineWidth = 4;
          ctx.setLineDash([6, 6]);
          ctx.strokeStyle = i === 0 ? 'red' : '#fff';
          ctx.stroke();
          if (i === 0) {
            ctx.beginPath();
            ctx.arc(x, y, size / 2 + 4, 0, 2 * Math.PI);
            ctx.stroke();
          }
          // ctx.lineWidth = 1;
          // ctx.font = '20px Monaco, Consolas';
          // // ctx.setLineDash([0, 0]);
          // ctx.fillStyle = '#fff';
          // ctx.textAlign = 'center';
          // ctx.fillText(_distance, x, y - size / 2 - 16);
        });
      }
    }
  }, [debug, width, height, master, targets, size]);

  return (
    <div className={styles.root}>
      <canvas ref={ref} />
    </div>
  );
}

export default Aim;
