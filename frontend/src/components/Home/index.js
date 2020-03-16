import React, { Component } from "react";
import Loading from "../Loading";

class Home extends Component {
    constructor(props){
        super(props)
        this.state = { isLoading: true }
    }

    componentDidMount(){
        this.setState({ isLoading: false })
    }

    render(){
        return (
            this.state.isLoading ? <Loading /> : 
            <div>home</div>
        )
    }
}

export default Home;