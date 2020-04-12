import React from 'react';
import { Link } from "react-router-dom"
import styles from "./styles.module.scss";
import PageTopAlert from "components/PageTopAlert"
import IntegrationIcon from "assets/images/icon-04.png"
import FacebookAdsImage from "assets/images/Icon_Integrations-01.png"
import GoogleAdsImage from "assets/images/Icon_Integrations-02.png"
import GoogleAnalyticsImage from "assets/images/Icon_Integrations-05.png"
import GoogleSheetsImage from "assets/images/Icon_Integrations-03.png"
import SlackImage from "assets/images/Icon_Integrations-04.png"

const Dashboard = props => (
    <div className={styles.dashboard}>
        <div className={styles.leftDiv}>
            <div className={styles.navRow}>
                <img src={IntegrationIcon} alt="integration icon" />
                <p>Integrations</p>
            </div>
        </div>
        <div className={styles.rightDiv}>
            <PageTopAlert />
            <div className={styles.container}>
                {/* <div className={styles.gridCell}>
                    <div className={styles.imgDiv}>
                        <img src={FacebookAdsImage} alt="facebook ads" />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.greenBorderButton}>Connect</button>
                        <button className={styles.grayBorderButton}>Guide</button>
                    </div>
                </div>
                <div className={styles.gridCell}>
                    <div className={styles.imgDiv}>
                        <img src={GoogleAdsImage} alt="google ads" />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.greenBorderButton}>Connect</button>
                        <button className={styles.grayBorderButton}>Guide</button>
                    </div>
                </div>
                <div className={styles.gridCell}>
                    <div className={styles.imgDiv}>
                        <img src={GoogleAnalyticsImage} alt="google analytics" />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.greenBorderButton}>Connect</button>
                        <button className={styles.grayBorderButton}>Guide</button>
                    </div>
                </div>
                <div className={styles.gridCell}>
                    <div className={styles.imgDiv}>
                        <img src={GoogleSheetsImage} alt="google sheets" />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.greenBorderButton}>Connect</button>
                        <button className={styles.grayBorderButton}>Guide</button>
                    </div>
                </div> */}
                <div className={styles.gridCell}>
                    <div className={styles.imgDiv}>
                        <img src={SlackImage} alt="slack" />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Link to="/app/connect/slack" className={styles.greenBorderButton}>Connect</Link>
                        <button className={styles.grayBorderButton}>Guide</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)


export default Dashboard;