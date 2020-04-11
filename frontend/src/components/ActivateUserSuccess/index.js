import React, { Component } from 'react'
import SuccessIcon from 'assets/images/success_icon.png'
import styles from "./styles.module.scss"
import { Link } from "react-router-dom"

class ActivateUserSuccess extends Component {
    render(){
        return (
            <div className={styles.success}>
            <div className={styles.container}>
                  <img src={SuccessIcon} alt="success icon" />
                  <p>User Activated!</p>
                  <Link className={styles.homeLink} to="/">Go to Home</Link>
            </div>
          </div >      
        )
    }
}

export default ActivateUserSuccess