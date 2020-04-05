import React, { Component } from "react"
import { connect } from "react-redux"
import Dashboard from "./presenter"
import * as userActions from "store/modules/user";


class Container extends Component {

    render(){
        return (
            <Dashboard
                {...this.props}
            />
        )
    }
}

const mapStateToProps = state => {
    const { user: { isLoggedIn } } = state;
    return {
      isLoggedIn,
    }
  }
  

const mapDispatchToProps = dispatch =>{
    return {
        logout: () => {
            dispatch(userActions.logout())
        },
        // slackConnect: () => {
        //     dispatch(dashboardActions.slackConnect())
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
