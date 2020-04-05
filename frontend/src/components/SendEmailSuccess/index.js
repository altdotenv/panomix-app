import React, { Component } from 'react'
import { connect } from "react-redux"
import SuccessIcon from 'assets/images/success_icon.png'
import styles from "./styles.module.scss"
import { Link } from "react-router-dom"

class SendEmailSuccess extends Component {
    render(){
        return (
            <div className={styles.success}>
            <div className={styles.container}>
                  <img src={SuccessIcon} alt="success icon" />
                  <p>We have sent request mail to <strong>{this.props.workplace}</strong> Host</p>
                  <Link className={styles.homeLink} to="/">Go to Home</Link>
            </div>
          </div >      
        )
    }
}

const mapStateToProps = state => {
    const { user: { workplace } } = state
    return {
        workplace
    }
}

export default connect(mapStateToProps, null)(SendEmailSuccess)