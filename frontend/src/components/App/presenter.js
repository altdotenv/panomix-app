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
import Slack from "../Slack"
import SendEmailSuccess from "../SendEmailSuccess"

const App = props => [
    props.isLoggedIn && props.location.pathname !== "/" ? <PrivateNavBar key={0}/> : <NavBar  key={0}/>,
    props.isLoggedIn ? <PrivateRoutes key={1} /> : <PublicRoutes key={1} />,
    props.isLoggedIn && props.location.pathname !== "/" ? null : <Footer key={2} />
]

const PrivateRoutes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/app/:workplace" component={Dashboard} />
        <Route exact path="/app/connect/slack" component={Slack} />
        <Route exact path="/features" component={Features} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/request/success" component={SendEmailSuccess} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/contact" component={Contact} />
    </Switch>
)

const PublicRoutes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/features" component={Features} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/request/success" component={SendEmailSuccess} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="*" render={() => (<Redirect to="/" />)} />
    </Switch>
)
  
export default App;
