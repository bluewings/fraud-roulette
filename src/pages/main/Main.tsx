import React, { useMemo, useState } from 'react';
import styles from './Main.module.scss';
import Intro from './Intro';
import Stage from './Stage';

export const uriPattern = '/';

enum Mode {
  intro = 'intro',
  stage = 'stage',
  stage_debug = 'stage_debug',
}

const Main: React.FC = () => {
  const [mode, setMode] = useState(Mode.intro);

  const Current = useMemo(() => {
    window.scrollTo(0, 0);
    switch (mode) {
      case Mode.intro:
        return Intro;
      case Mode.stage:
        return Stage;
      case Mode.stage_debug:
        return () => <Stage debug={true} />;
      default:
        return () => null;
    }
  }, [mode]);

  const moveTo = useMemo(
    () => ({
      moveToIntro: () => setMode(Mode.intro),
      moveToStage: () => setMode(Mode.stage),
      moveToStage_debug: () => setMode(Mode.stage_debug),
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
