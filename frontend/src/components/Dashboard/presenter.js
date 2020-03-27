import React from 'react';
import styles from "./styles.module.scss";

const Dashboard = props => (
    <div className={styles.dashboard}>
        {props.workplace} dashboard
        <button onClick={() => props.logout()}>Logout</button>
    </div>
)


export default Dashboard;