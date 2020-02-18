import React from 'react';
import styles from './Layout.module.scss';

const Layout: React.FC = (props: any) => {
  return <div className={styles.root}>{props.children}</div>;
};

export default Layout;
