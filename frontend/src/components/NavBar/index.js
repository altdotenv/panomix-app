import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import MainLogo from "../../assets/images/panomix_logo.png";

class NavBar extends Component {
    render(){
        return (
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <img src={MainLogo} alt="logo" />
                    </div>
                    <div className={styles.links}>
                        <NavLink to="/" className={styles.tag} >Home</NavLink>
                        <NavLink to="/features" className={styles.tag} >Features</NavLink>
                        <NavLink to="/pricing" className={styles.tag} onClick={ (event) => event.preventDefault() }>Pricing</NavLink>
                        <NavLink to="/login" className={styles.tag} >Login</NavLink>
                        <NavLink to="/signup" className={styles.tag} >Sign up</NavLink>
                    </div>
                </div>
            </nav>
            
        )
    }
}

export default NavBar;