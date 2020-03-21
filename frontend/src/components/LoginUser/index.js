import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";
import LoginUser from "./presenter";

class Container extends Component {

    render(){
        console.log(this.props)
        return (
            <LoginUser 
                {...this.props}
            />
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLoginGoogle: result => {
            dispatch(userActions.onLoginGoogle(result))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);
