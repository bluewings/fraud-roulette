import * as React from 'react';
import styles from './Intro.module.scss';

function Intro({ moveToStage, moveToStage_debug }: any) {
  return (
    <>
      <div className={styles.root}>
        <h1 onClick={moveToStage}>Tab Roulette</h1>
      </div>
      <div className={styles.root} style={{ alignItems: 'flex-end' }}>
        <h1
          onClick={moveToStage_debug}
          style={{ color: 'rgba(255,255,255,0.1)' }}
        >
          Debug
        </h1>
      </div>
    </>
  );
}

export default Intro;
