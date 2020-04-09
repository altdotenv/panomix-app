import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import * as userActions from "store/modules/user";
import styles from "./styles.module.scss";
import MainLogo from "../../assets/images/panomix_logo.png";
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends Component {

    state = {
        isToggleOn:false,
        openDropdown: false,
    };

    componentDidMount(){
        const { isLoggedIn, getUserInfo } = this.props
        this.setState({
            isToggleOn:false,
            openDropdown: false
        })
        
        if (isLoggedIn){
            getUserInfo()
        }
    }

    render(){
        const userWorkplaces = this.props.info ? this.props.info.workplaces : null
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
                            <button className={styles.greenFilledTag} onClick={() => this.toggleDropdown()}>Launch Panomix</button>
                            {this.state.openDropdown ? (
                                <div className={styles.dropdown}>
                                    {userWorkplaces ?
                                    <div className={styles.workplaceList}>
                                        {userWorkplaces.map((obj, index) => (
                                            <NavLink to={"app/"+obj.name} key={index} className={styles.dropdownLink}>{obj.name}</NavLink>
                                        ))}
                                        <hr />
                                    </div>
                                    : null}
                                    <NavLink to="/login" className={styles.dropdownLink} onClick={() => this.toggleDropdown()} >Login to Another Workplace</NavLink>
                                    <NavLink to="/signup" className={styles.dropdownLink} onClick={() => this.toggleDropdown()}>Create a New Workplace</NavLink>
                                </div>
                            ) : null}
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
                        <button className={styles.greenFilledTag} onClick={() => this.toggleDropdown()}>Launch Panomix</button>
                        {this.state.openDropdown ? (
                            <div className={styles.dropdown}>
                                {userWorkplaces ?
                                <div className={styles.workplaceList}>
                                    {userWorkplaces.map((obj, index) => (
                                        <NavLink to={"app/"+obj.name} key={index}>{obj.name}</NavLink>
                                    ))}
                                </div>
                                : null}
                                <NavLink to="/login" className={styles.dropdownLink} onClick={() => this.toggleDropdown()} >Login to Another Workplace</NavLink>
                                <NavLink to="/signup" className={styles.dropdownLink} onClick={() => this.toggleDropdown()}>Create a New Workplace</NavLink>
                            </div>
                        ) : null}
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

    toggleDropdown(){
        this.setState(prevState => ({
            openDropdown: !prevState.openDropdown,
        }))
    }

}

const mapStateToProps = state => {
    const { user: { isLoggedIn, info } } = state;
    return {
        isLoggedIn,
        info
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: () => {
            dispatch(userActions.getUserInfo());
        }
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);


