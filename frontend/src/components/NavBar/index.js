import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import MainLogo from "../../assets/images/panomix_logo.png";
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends Component {

    state = {
        isToggleOn:false
    };

    componentDidMount(){
        this.setState({
            isToggleOn:false
        })
    }

    render(){
        return (
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <div className={styles.leftNav}>
                        <div className={styles.logo}>
                            <NavLink to="/"><img src={MainLogo} alt="logo" /></NavLink>
                        </div>
                        <div className={styles.links}>
                            <NavLink to="/features" className={styles.tag} >Features</NavLink>
                            <NavLink to="/pricing" className={styles.tag} onClick={ (event) => event.preventDefault() }>Pricing</NavLink>
                        </div>
                    </div>
                    <div className={styles.rightNav}>
                        <div className={styles.links}>
                            <NavLink to="/login" className={styles.greenFilledTag} >Launch Panomix</NavLink>
                            <NavLink to="/contact" className={styles.greenRoundTag} >Contact Us</NavLink>
                        </div>
                        <div className={styles.toggleNav}>
                            <MenuIcon onClick={() => this.handleClick()} style={{ cursor: "pointer", color: "#00c18c"}}></MenuIcon>
                        </div>
                    </div>
                </div>
                {this.state.isToggleOn ?
                    <div className={styles.toggledLinks}>
                        <NavLink to="/features" className={styles.tag} >Features</NavLink>
                        <NavLink to="/pricing" className={styles.tag} onClick={ (event) => event.preventDefault() }>Pricing</NavLink>
                        <NavLink to="/login" className={styles.greenFilledTag} >Launch Panomix</NavLink>
                        <NavLink to="/contact" className={styles.greenRoundTag} >Contact Us</NavLink>
                    </div>
                : null}
            </nav>
            
        )
    }

    handleClick() {
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
      }    

}

export default NavBar;


