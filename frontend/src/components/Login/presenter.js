import React from 'react'
import styles from "./styles.module.scss"
import { Link } from "react-router-dom"
// import MainLogo from "../../assets/images/panomix_logo.png";
import LoginUser from "../LoginUser"

const Login = props => (    
    <div className={styles.login}>
        {props.has_workplace ? 
            <LoginUser />
            :
            <div className={styles.container}>
                <h2>Login to your Workplace</h2>
                <form onSubmit={props.handleSubmit}>
                    <label className={styles.inputLabel}>Workplace Name</label>
                    <input
                        type="text"
                        className={
                            props.is_workplace_exist ? styles.workplaceInput : styles.workplaceFailInput}
                        name="workplace"
                        value={props.workplace}
                        onChange={props.handleChange}
                    />
                    {props.is_workplace_exist ? null : <p className={styles.notExistComment}>Workplace not exist</p> }
                    <button type="submit" className={styles.workplaceButton}>Continue</button>
                    <p>Don't have a workplace? <Link to="signup" className={styles.signupLink}>Create a new workplace</Link></p>
                </form>
            </div>            
        }
    </div>
)

export default Login;