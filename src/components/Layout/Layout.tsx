import React, { useEffect, useRef } from 'react';
import styles from './Layout.module.scss';

const Layout: React.FC = (props: any) => {
  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) {
      const preventDefault = (event: any) => event.preventDefault();
      ref.current.addEventListener('touchstart', preventDefault);
      ref.current.addEventListener('touchmove', preventDefault);
    }
  }, []);
  return (
    <div ref={ref} className={styles.root}>
      {props.children}
    </div>
  );
};

export default Layout;
