import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Home from "../Home"
import NavBar from "../NavBar"
import Features from "../Features"
import Login from "../Login"
import Signup from "../Signup"
import Dashboard from "../Dashboard"
import Footer from "../Footer"
import Terms from "../Terms"
import Privacy from "../Privacy"
import Contact from "../Contact"
import PrivateNavBar from "../PrivateNavBar"

const App = props => [
    props.isLoggedIn ? <PrivateNavBar key={0}/> : <NavBar key={0}/>,
    props.isLoggedIn ? <PrivateRoutes key={1} /> : <PublicRoutes key={1} />,
    props.isLoggedIn ? null : <Footer key={2} />
]

// App.propTypes = {
//     isLoggedIn: PropTypes.bool.isRequired
// }

const PrivateRoutes = () => (
    <Switch>
        <Route exact path="/app" component={Dashboard} />
    </Switch>
)

const PublicRoutes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/features" component={Features} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/app" render={() => (<Redirect to="/" />)} />
    </Switch>
)
  
export default App;
