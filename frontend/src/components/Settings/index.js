import React, { Component } from "react"
import { connect } from "react-redux"
import * as userActions from "store/modules/user"
import Settings from "./presenter"


class Container extends Component {

    componentDidMount(){
        const { getWorkplaceUserList } = this.props;
        getWorkplaceUserList();
    }

    render(){
        return (
            <Settings
                {...this.props}
                {...this.state}
            />
        )
    }


}

const mapStateToProps = state => {
    const { user: { userList } } = state;
    return {
        ...state,
        userList
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getWorkplaceUserList:() => {
            dispatch(userActions.getWorkplaceUserList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)