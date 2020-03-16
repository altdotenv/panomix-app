import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./presenter";
import * as userActions from "store/modules/user";

class Container extends Component {

    state = {
        workplace: ''
    }

    render(){
        return (
            <Login
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        )
    }

    handleChange = event => {
        const { target: { name, value } } = event;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = event => {
        const { checkWorkplace } = this.props;
        const { workplace } = this.state;
        event.preventDefault();
        checkWorkplace(workplace);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkWorkplace: (workplace) => {
            dispatch(userActions.checkWorkplace(workplace));
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);
