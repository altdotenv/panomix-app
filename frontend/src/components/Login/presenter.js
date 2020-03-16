import React, { Component } from 'react';
import styles from "./styles.module.scss";
import MainLogo from "../../assets/images/panomix_logo.png";

const Login = props => (
    <div className={styles.login}>
        <form onSubmit={props.handleSubmit}>
            <input
                type="text"
                className={styles.loginInput}
                placeholder="workplace"
                name="workplace"
                value={props.workplace}
                onChange={props.handleChange}
            />
            <button type="submit" className={styles.signInButton}>Continue</button>
        </form>
    </div>
)


export default Login;