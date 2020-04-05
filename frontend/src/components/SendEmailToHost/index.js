import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import styles from "./styles.module.scss";
import * as userActions from "store/modules/user";
import Loading from "../Loading"


class SendEmailToHost extends Component {

    render(){
        return (
            <div className={styles.sendEmailToHost}>
                {this.props.loading ? <Loading /> :
                <div className={styles.container}>
                    <p>Your email <strong>{this.props.not_registered_email}</strong> not registered in <strong>{this.props.workplace}</strong> workplace.</p>
                    <p>Send a request email to <strong>{this.props.workplace}</strong> host?</p>
                    <button onClick={() => this.handleClick(this.props.not_registered_email)} className={styles.greenRectangleButton}>Request Access</button>
                    <button onClick={() => this.props.delete_not_registered_email()} className={styles.grayRectangleButton}>Go Back to Login</button>
                </div>
             }
            </div>
        )
    }

    handleClick(userMail){
        const { sendRequestMail } = this.props
        sendRequestMail(userMail)
    }

}

const mapStateToProps = state => {
    const { user: { workplace, not_registered_email, loading } } = state;
    return {
      workplace,
      not_registered_email,
      loading
    }
  }
  

const mapDispatchToProps = dispatch =>{
    return {
        logout: () => {
            dispatch(userActions.logout())
        },
        delete_not_registered_email: () => {
            dispatch(userActions.delete_not_registered_email())
        },
        sendRequestMail: (userEmail) => {
            dispatch(userActions.sendRequestMail(userEmail))
        },

        // slackConnect: () => {
        //     dispatch(dashboardActions.slackConnect())
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendEmailToHost);
