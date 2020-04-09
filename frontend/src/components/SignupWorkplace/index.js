import React, { Component } from "react"
import { connect } from "react-redux"
import * as userActions from "store/modules/user"
import SignupWorkplace from "./presenter"


class Container extends Component {

    state = {
        // "name": "",
        // "email": "",
        // "password": "",
        // "workplace": "",
        "workplaceWithGoogle": ""
    }

    componentDidMount(){
        const {initialize_workplace } = this.props;
        initialize_workplace();
    }


    componentDidUpdate(prevProps, prevState){
        const { workplace_with_google_not_exist, google_email_not_exist } = this.props
        if (prevState.workplaceWithGoogle !== this.state.workplaceWithGoogle){
            workplace_with_google_not_exist()
            google_email_not_exist()
        }
    }

    render(){
        return (
            <SignupWorkplace
                {...this.props}
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                onSignupGoogle={this.onSignupGoogle}
                handleCheckboxChange={this.handleCheckboxChange}
            />
        )
    }

    handleChange = event => {
        const { target: { name, value } } = event;
        this.setState({
            [name]: value,
        })
    }

    handleCheckboxChange = event => {
        const { target : { name, checked } } = event;
        this.setState({
            [name]: checked,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
    }

    onSignupGoogle = result => {
        const { workplaceWithGoogle } = this.state
        const { userSignupWithGoogle } = this.props
        if(workplaceWithGoogle && result){
            userSignupWithGoogle(workplaceWithGoogle, result)
        } 
    }

}

const mapStateToProps = state => {
    const { user: { token, is_workplace_with_google_exist, google_email_exist } } = state;
    return {
        ...state,
        token,
        is_workplace_with_google_exist,
        google_email_exist
    }
}


const mapDispatchToProps = dispatch => {
    return {
        initialize_workplace: () => {
            dispatch(userActions.initialize_workplace())
        },
        workplace_with_google_not_exist: () => {
            dispatch(userActions.workplace_with_google_not_exist())
        },
        userSignupWithGoogle: (workplace, result) => {
            dispatch(userActions.userSignupWithGoogle(workplace, result))
        },
        google_email_not_exist: () => {
            dispatch(userActions.google_email_not_exist())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)