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
                <h2>Login to your Workspace</h2>
                <form onSubmit={props.handleSubmit}>
                    <label className={styles.inputLabel}>Workspace Name</label>
                    <input
                        type="text"
                        className={
                            props.is_workplace_exist ? styles.workspaceInput : styles.workspaceFailInput}
                        name="workplace"
                        value={props.workplace}
                        onChange={props.handleChange}
                    />
                    {props.is_workplace_exist ? null : <p className={styles.notExistComment}>Workspace not exist</p> }
                    <button type="submit" className={styles.workspaceButton}>Continue</button>
                    <p>Don't have a workspace? <Link to="signup" className={styles.signupLink}>Create a new workspace</Link></p>
                </form>
            </div>            
        }
    </div>
)

export default Login;