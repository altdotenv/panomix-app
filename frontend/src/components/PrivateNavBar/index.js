import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import * as userActions from "store/modules/user";
import styles from "./styles.module.scss";
import MainLogo from "assets/images/panomix_logo_mix-06.png"
import LogoutIcon from "assets/images/icon-03.png"
import SettingIcon from "assets/images/icon-02.png"

class PrivateNavBar extends Component {

    render(){
        return (
            <div className={styles.nav}>
                <div className={styles.leftNav}>
                    <div className={styles.logo}>
                        <NavLink to="/"><img src={MainLogo} alt="logo" /></NavLink>
                    </div>
                </div>
                <div className={styles.rightNav}>
                    <p>{this.props.name}Jisu Han</p>
                    <div className={styles.links}>
                        <img onClick={() => this.props.logout()} src={SettingIcon} />
                        <img onClick={() => this.props.logout()} src={LogoutIcon} />
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        logout: () => {
            dispatch(userActions.logout())
        }
    }
}

export default connect(null, mapDispatchToProps)(PrivateNavBar);


