import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../Home";
import NavBar from "../NavBar";
import Features from "../Features";
import Login from "../Login";

const App = props => [
    <NavBar/>,
    <PublicRoutes />
    // props.isLoggedIn ? null : <Redirect to="/" key={0} />,
    // props.isLoggedIn ? <Header key={1} {...props} /> : null,
    // props.isLoggedIn ? <PrivateRoutes key={3} selectedService={props.selectedService} /> : <PublicRoutes key={3} />,
    // <Footer key={4} />
]

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

// const PrivateRoutes = props => (
//     <Switch>
//       <Route exact path="/" render={() => <Dashboard selectedService={props.selectedService} />} />
//       <Route exact path="/settings" render={() => <UserSettings selectedService={props.selectedService} />} />
//       <Route exact path="/source" render={() => <DataSource selectedService={props.selectedService} />} />
//       {/* <Route exact path="/transformation" component={DataTransformation} /> */}
//       <Route exact path="/campaigns" render={() => <Campaign selectedService={props.selectedService} />} />
//       <Route exact path="/sales" render={() => <ProductSales selectedService={props.selectedService} />} />
//     </Switch>
// )

const PublicRoutes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/features" component={Features} />
        <Route exact path="/login" component={Login} />
    </Switch>
)
  
export default App;
  