import { connect } from "react-redux";
import React, { Component } from 'react';
import App from "./presenter";
import { withRouter } from 'react-router-dom';

// const Container = props => <App {...props} />;
class Container extends Component {

    render(){
        return (
            <App
                {...this.props}
                {...this.state}
            />
        )
    }

}

const mapStateToProps = state => {
  const { user: { isLoggedIn, workplace } } = state;
  return {
    isLoggedIn,
    workplace
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//       getUserInfo: () => {
//         dispatch(userActions.getUserInfo());
//     }
//   }
// }

export default withRouter(connect(mapStateToProps, null)(Container));