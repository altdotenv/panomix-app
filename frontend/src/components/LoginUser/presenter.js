import React from 'react';
import styles from "./styles.module.scss";
import { GoogleLogin } from 'react-google-login';
import GoogleLogo from "assets/images/google-logo3.png"


const LoginUser = props => (
    <div className={styles.login}>
        <div className={styles.container}>
            <h2>Login to Workplace</h2>
            <GoogleLogin
                clientId="50053165531-unai3d7bikknt31vnvp71d3gv14jectv.apps.googleusercontent.com"
                render={renderProps => (
                    <div 
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className={styles.googleLoginButton}
                    >
                        <img src={GoogleLogo} alt="google-logo" />
                        <p>Login with Google</p>
                    </div>
                )}
                onSuccess={result => props.onLoginGoogle(result)}
                onFailure={result => console.log(result)}
                redirectUri={window.location.href}
                disabled={props.workplaceWithGoogle ? false : true}
            />
            {props.google_not_email_exist ? <p className={styles.notExistComment}>Check your Workplace or Email.</p> : null }
        </div>

    </div>
)


export default LoginUser;