import React from 'react';
import { Link } from "react-router-dom"
import styles from "./styles.module.scss";
import IntegrationIcon from "assets/images/icon-04.png"
import FacebookAdsImage from "assets/images/logo_facebook ads.jpg"
import GoogleAdsImage from "assets/images/logo_google ads.png"
import GoogleAnalyticsImage from "assets/images/logo_google analytics.png"
import GoogleSheetsImage from "assets/images/logo_google sheets.png"
import SlackImage from "assets/images/logo_slack.png"

const Dashboard = props => (
    <div className={styles.dashboard}>
        <div className={styles.leftDiv}>
            <div className={styles.navRow}>
                <img src={IntegrationIcon} alt="integration icon" />
                <p>Integrations</p>
            </div>
        </div>
        <div className={styles.rightDiv}>
            <div className={styles.container}>
                <div className={styles.gridCell}>
                    <div className={styles.imgDiv}>
                        <img src={FacebookAdsImage} alt="facebook ads image" />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.greenBorderButton}>Connect</button>
                        <button className={styles.grayBorderButton}>Guide</button>
                    </div>
                </div>
                <div className={styles.gridCell}>
                    <div className={styles.imgDiv}>
                        <img src={GoogleAdsImage} alt="google ads image" />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.greenBorderButton}>Connect</button>
                        <button className={styles.grayBorderButton}>Guide</button>
                    </div>
                </div>
                <div className={styles.gridCell}>
                    <div className={styles.imgDiv}>
                        <img src={GoogleAnalyticsImage} alt="google analytics image" />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.greenBorderButton}>Connect</button>
                        <button className={styles.grayBorderButton}>Guide</button>
                    </div>
                </div>
                <div className={styles.gridCell}>
                    <div className={styles.imgDiv}>
                        <img src={GoogleSheetsImage} alt="google sheets image" />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.greenBorderButton}>Connect</button>
                        <button className={styles.grayBorderButton}>Guide</button>
                    </div>
                </div>
                <div className={styles.gridCell}>
                    <div className={styles.imgDiv}>
                        <img src={SlackImage} alt="slack image" />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Link to="/app/connect/slack" className={styles.greenBorderButton}>Connect</Link>
                        <button className={styles.grayBorderButton}>Guide</button>
                    </div>
                </div>
            </div>
        </div>
        {/* <button onClick={() => props.logout()}>Logout</button> */}
    </div>
)


export default Dashboard;