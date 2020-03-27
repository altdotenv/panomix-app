import React, { Component } from "react"
import styles from "./styles.module.scss"

class Contact extends Component {
    render(){
        return (
            <div className={styles.contact}>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc_zESdFVlmonBlSW_ZFDya7l_s5ma_e4ztIajKZxpHsquxOw/viewform?embedded=true" width="100%" height="2704" frameBorder="0" marginHeight="0" marginWidth="10">Loading…</iframe>
            </div>
        )
    }
}

export default Contact