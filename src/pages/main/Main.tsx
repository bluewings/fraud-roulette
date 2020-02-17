import React, { useMemo, useState } from 'react';
import styles from './Main.module.scss';
import Intro from './Intro';
import Stage from './Stage';

export const uriPattern = '/';

enum Mode {
  intro = 'intro',
  stage = 'stage',
}

const Main: React.FC = () => {
  const [mode, setMode] = useState(Mode.stage);

  const Current = useMemo(() => {
    switch (mode) {
      case Mode.intro:
        return Intro;
      case Mode.stage:
        return Stage;
      default:
        return () => null;
    }
  }, [mode]);

  const moveTo = useMemo(
    () => ({
      moveToIntro: () => setMode(Mode.intro),
      moveToStage: () => setMode(Mode.stage),
    }),
    [setMode],
  );

  return (
    <div className={styles.root}>
      <Current {...moveTo} />
    </div>
  );
};

export default Main;
