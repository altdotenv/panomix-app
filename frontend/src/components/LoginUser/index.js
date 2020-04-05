import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";
import LoginUser from "./presenter";

class Container extends Component {

    componentDidMount(){
        const { google_email_not_exist_false } = this.props;
        google_email_not_exist_false();
    }

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
    const { user : { google_not_email_exist, not_registered_email } } = state
    return {
        ...state,
        google_not_email_exist,
        not_registered_email
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLoginGoogle: result => {
            dispatch(userActions.onLoginGoogle(result))
        },
        google_email_not_exist_false: () => {
            dispatch(userActions.google_email_not_exist_false())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
