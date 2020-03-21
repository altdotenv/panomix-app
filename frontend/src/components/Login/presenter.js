import React from 'react';
import styles from "./styles.module.scss";
// import MainLogo from "../../assets/images/panomix_logo.png";
import LoginUser from "../LoginUser"

const Login = props => (
    
    <div className={styles.login}>
        {props.has_workplace ? 
            <LoginUser />
            :
            <form onSubmit={props.handleSubmit}>
                <input
                    type="text"
                    className={styles.loginInput}
                    placeholder="workplace"
                    name="workplace"
                    value={props.workplace}
                    onChange={props.handleChange}
                />
                {props.is_workplace_exist ? null : <p>not exist</p> }
                <button type="submit" className={styles.signInButton}>Continue</button>
            </form>
            
        }
    </div>
)

export default Login;