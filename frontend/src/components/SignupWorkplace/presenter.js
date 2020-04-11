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
                    <Link to="terms" className={styles.loginLink}>terms of service</Link>
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
                />
                <p>Already have a workplace? <Link to="login" className={styles.loginLink}>Login to your workplace</Link></p>
            </form>
        </div>
    </div>
)

export default SignupWorkplace