import React from 'react';
import GrayLogo from 'assets/images/panomix_logo_gray.png';
import styles from "./styles.module.scss"
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerPartition}>
            <div className={styles.imgDiv}><img src={GrayLogo} alt="logo" /></div>
            <div className={styles.colDiv}>
              <h6>Contact</h6>
              <p>info@panomix.io</p>
            </div >
        </div>
        <hr />
        <div className={styles.footerPartition}>
          <p>Copyright &copy; 2020 Panomix</p>
          <Link to='/terms' className={styles.subLink}>Terms of Service</Link>
          <Link to='/privacy' className={styles.subLink}>Privacy Policy</Link>
        </div>
      </div>
    </div >
  );
}