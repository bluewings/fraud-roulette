import React from 'react';
import styles from './About.module.scss';

export const uriPattern = '/about';

const About: React.FC = (props: any) => {
  return (
    <div className={styles.root}>
      <h1>About</h1>
    </div>
  );
};

export default About;
