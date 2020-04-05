import React from "react"
import styles from "./styles.module.scss"
import { GoogleLogin } from 'react-google-login'
import { Link } from "react-router-dom"
import GoogleLogo from "assets/images/google-logo3.png"
import Checkbox from "components/Checkbox"

const SignupWorkplace = props => (
    <div className={styles.signup}>
        <div className={styles.container}>
            <h2>Create a New Workplace</h2>
            {/* <form onSubmit={props.handleSubmit}>
                <label className={styles.inputLabel}>Name</label>
                <input
                    type="text"
                    className={styles.greenInput}
                    name="name"
                    value={props.name}
                    onChange={props.handleChange}
                    required
                />
                <label className={styles.inputLabel}>Email</label>
                <input
                    type="text"
                    className={
                        props.email_exist ? styles.redInput : styles.greenInput
                    }
                    name="email"
                    value={props.email}
                    onChange={props.handleChange}
                    pattern="^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$"
                    required
                />
                {props.email_exist ? <p className={styles.notExistComment}>email exist</p> : null}
                <label className={styles.inputLabel}>Password</label>
                <input
                    type="password"
                    className={styles.greenInput}
                    name="password"
                    value={props.password}
                    onChange={props.handleChange}
                    required
                />
                <label className={styles.inputLabel}>Workplace Name</label>
                <input
                    type="text"
                    className={
                        props.is_workplace_exist ? styles.redInput : styles.greenInput
                    }
                    name="workplace"
                    value={props.workplace}
                    onChange={props.handleChange}
                    required
                />
                {props.is_workplace_exist ? <p className={styles.notExistComment}>workplace name already exist</p> : null }
                <button type="submit" className={styles.signInButton}>Continue</button>
            </form>
            <hr className={styles.hrText} data-content="Or" /> */}
            <form onSubmit={props.handleSubmit}>
                <label className={styles.inputLabel}>Workplace Name</label>
                <input
                    type="text"
                    className={
                        props.is_workplace_with_google_exist ? styles.redInput : styles.greenInput
                    }
                    name="workplaceWithGoogle"
                    value={props.workplaceWithGoogle}
                    onChange={props.handleChange}
                    required
                />
                {props.is_workplace_with_google_exist ? <p className={styles.notExistComment}>Workplace name already exist.</p> : null }
                <div className={styles.termsCheckDiv}>
                    <Checkbox name="termsChecked" onChange={props.handleCheckboxChange} />
                    <Link to="login" className={styles.loginLink}>terms of service</Link>
                </div>

                <GoogleLogin
                    clientId="50053165531-unai3d7bikknt31vnvp71d3gv14jectv.apps.googleusercontent.com"
                    render={renderProps => (
                        <div 
                            onClick={props.workplaceWithGoogle && props.termsChecked ? renderProps.onClick : null}
                            disabled={renderProps.disabled}
                            className={
                                props.workplaceWithGoogle && props.termsChecked ?  styles.googleSignupButton : styles.googleSignupButtonDisabled
                            }
                        >
                            <img src={GoogleLogo} alt="google-logo" />
                            <p>Sign Up with Google</p>
                        </div>
                    )}
                    onSuccess={result => props.onSignupGoogle(result)}
                    onFailure={result => console.log(result)}
                    redirectUri={window.location.href}
                    disabled={props.workplaceWithGoogle ? false : true}
                    // uxMode="redirect"
                />
                {props.google_email_exist ? <p className={styles.notExistComment}>Email already exist.</p> : null}
                <p>Already have a workplace? <Link to="login" className={styles.loginLink}>Login to your workplace</Link></p>
            </form>
        </div>
    </div>
)

export default SignupWorkplace