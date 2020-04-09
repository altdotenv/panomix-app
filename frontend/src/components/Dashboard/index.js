import React, { Component } from "react"
import { connect } from "react-redux"
import Dashboard from "./presenter"
import * as userActions from "store/modules/user";
import * as dashboardActions from "store/modules/dashboard";


class Container extends Component {

    componentDidMount(){
        const { match: { params }, getDashboardInfo } = this.props
        getDashboardInfo(params.workplace)
    }

    render(){
        return (
            <Dashboard
                {...this.props}
            />
        )
    }
}

const mapStateToProps = state => {
    const { user: { isLoggedIn, info } } = state;
    return {
      isLoggedIn,
      info,
    }
}
  

const mapDispatchToProps = dispatch =>{
    return {
        logout: () => {
            dispatch(userActions.logout())
        },
        getDashboardInfo:(workplace) => {
            dispatch(dashboardActions.getDashboardInfo(workplace))
        }
        // slackConnect: () => {
        //     dispatch(dashboardActions.slackConnect())
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
