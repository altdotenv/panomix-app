import React from 'react';
import styles from "./styles.module.scss";
import { connect } from "react-redux"

const PageTopAlert = props => (
    <>
    {props.isConnectSuccessed === null ?
    null:
        <>
        {props.isConnectSuccessed ?
        <div className={styles.successAlert}>Connect Success!</div>:
        <div className={styles.failAlert}>Connect Failed!</div>
        }
        </>
    }
    </>
)

const mapStateToProps = state => {
    const { dashboard: { is_connect_successed } } = state;
    return {
        ...state,
        isConnectSuccessed: is_connect_successed
    }
}

export default connect(mapStateToProps, null)(PageTopAlert);