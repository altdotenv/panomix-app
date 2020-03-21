import React from 'react';
import styles from "./styles.module.scss";
import MainLogo from "../../assets/images/panomix_logo.png";
import { GoogleLogin } from 'react-google-login';

const LoginUser = props => (
    <div className={styles.login}>
        {console.log(props)}
        <GoogleLogin
            clientId="50053165531-unai3d7bikknt31vnvp71d3gv14jectv.apps.googleusercontent.com"
            // render={renderProps => (
            //     <div onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</div>
            // )}
            buttonText="Login with Google"
            onSuccess={result => props.onLoginGoogle(result)}
            onFailure={result => console.log(result)}
            redirectUri={window.location.href}
            uxMode="redirect"
            isSignedIn
        />

    </div>
)


export default LoginUser;