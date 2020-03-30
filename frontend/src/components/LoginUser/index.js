import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";
import LoginUser from "./presenter";

class Container extends Component {

    render(){
        return (
            <LoginUser 
                {...this.props}
                {...this.state}
            />
        )
    }
}

const mapStateToProps = state => {
    const { user : { google_not_email_exist } } = state
    return {
        ...state,
        google_not_email_exist
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLoginGoogle: result => {
            dispatch(userActions.onLoginGoogle(result))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
