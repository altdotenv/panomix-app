import React, { Component } from "react"
import { connect } from "react-redux"
import * as userActions from "store/modules/user"
import SignupWorkplace from "./presenter"


class Container extends Component {

    state = {
        "name": "",
        "email": "",
        "password": "",
        "workplace": ""
    }

    componentDidMount(){
        const {initialize_workplace } = this.props;
        initialize_workplace();
    }


    componentDidUpdate(prevProps, prevState){
        const { workplace_not_exist, email_not_exist } = this.props
        if (prevState.workplace !== this.state.workplace){
            workplace_not_exist()
        } else if (prevState.email !== this.state.email){
            email_not_exist()
        }
    }

    render(){
        return (
            <SignupWorkplace
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
            [name]: value,
        })
    }

    handleSubmit = event => {
        const { name, email, password, workplace } = this.state
        const { userSignup } = this.props
        event.preventDefault()
        userSignup(name, email, password, workplace)
    }
}

const mapStateToProps = state => {
    const { user: { email_exist, is_workplace_exist, token } } = state;
    return {
        ...state,
        email_exist,
        is_workplace_exist,
        token
    }
}


const mapDispatchToProps = dispatch => {
    return {
        userSignup: (name, email, password, workplace) => {
            dispatch(userActions.userSignup(name, email, password, workplace));
        },
        checkWorkplace: workplace => {
            dispatch(userActions.checkWorkplace(workplace));
        },
        workplace_not_exist: () => {
            dispatch(userActions.workplace_not_exist())
        },
        email_not_exist: () => {
            dispatch(userActions.email_not_exist())
        },
        initialize_workplace: () => {
            dispatch(userActions.initialize_workplace())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)