import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import * as userActions from "store/modules/user";
import styles from "./styles.module.scss";
import MainLogo from "assets/images/panomix_logo_mix-06.png"
import LogoutIcon from "assets/images/icon-03.png"
import SettingIcon from "assets/images/icon-02.png"

class PrivateNavBar extends Component {

    componentDidMount(){
        const { info, getUserInfo } = this.props;
        if (!info){
            getUserInfo()
        }
    }

    render(){
        return (
            <div className={styles.nav}>
                <div className={styles.leftNav}>
                    <div className={styles.logo}>
                        <NavLink to="/"><img src={MainLogo} alt="panomix logo" /></NavLink>
                    </div>
                </div>
                <div className={styles.rightNav}>
                    <p>{this.props.info ? this.props.info.name : null}</p>
                    <div className={styles.links}>
                        <NavLink to={"/app/" + this.props.workplace + "/settings"}><img src={SettingIcon} alt="settings"/></NavLink>
                        <img onClick={() => this.props.logout()} src={LogoutIcon} alt="logout" />
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    const { user: { info, workplace } } = state;
    return {
      info,
      workplace
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        logout: () => {
            dispatch(userActions.logout())
        },
        getUserInfo: () => {
            dispatch(userActions.getUserInfo())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateNavBar);


