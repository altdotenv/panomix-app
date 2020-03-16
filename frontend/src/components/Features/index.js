import React, { Component } from "react";
import Loading from "../Loading";

class Features extends Component {
    state = {
        isLoading: true
    }
    
    componentDidMount(){
        this.setState({ isLoading: false })
    }

    render(){
        return (
            this.state.isLoading ? <Loading /> : 
            <div>Features</div>
        )
    }
}

export default Features;