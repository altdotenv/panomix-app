import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";
import Login from "./presenter";

class Container extends Component {

    state = {
        workplace: "",
        // has_workplace: true //for test
    }

    componentDidMount(){
        const { initialize_login } = this.props;
        initialize_login();
    }

    componentDidUpdate(prevProps, prevState){
        const { workplace_exist } = this.props
        if (prevState.workplace !== this.state.workplace){
            workplace_exist()
        }
    }

    render(){
        return (
            <Login
                {...this.props}
                {...this.state}
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

const mapStateToProps = state => {
    const { user: { workplace, has_workplace, is_workplace_exist } } = state;
    return {
        ...state,
        workplace,
        has_workplace,
        is_workplace_exist
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkWorkplace: workplace => {
            dispatch(userActions.checkWorkplace(workplace));
        },
        initialize_login: () => {
            dispatch(userActions.initialize_login())
        },
        workplace_exist: () => {
            dispatch(userActions.workplace_exist())
        },
        workplace_not_exist: () => {
            dispatch(userActions.workplace_not_exist())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
