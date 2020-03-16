import React from 'react';
import styles from "./styles.module.scss";
import CircularProgress from '@material-ui/core/CircularProgress';

export default () => {
  return (
    <div className={styles.loading}>
        <CircularProgress style={{color: '#00c18c'}}/>
    </div>
  );
}