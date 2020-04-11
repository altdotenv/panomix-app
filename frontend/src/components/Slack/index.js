import qs from "query-string"
import { connect } from "react-redux"
import * as dashboardActions from "store/modules/dashboard"
import { history } from "store/configure"
import { Component } from "react"
import Loading from "components/Loading"

const SLACK_CLIENT_ID = "934436568806.922065774977"
const AUTHORIZE_URI = "https://slack.com/oauth/v2/authorize"

const queryStr = qs.stringify({
    client_id: SLACK_CLIENT_ID,
    scope: "app_mentions:read,channels:join,channels:manage,chat:write,files:write,im:read,incoming-webhook,users:read"
})

const connectUrl = AUTHORIZE_URI + "?" + queryStr

class Slack extends Component {
    componentDidMount(){
        const { code, error } = qs.parse(this.props.location.search);
        const workplace = localStorage.getItem("workplace")
        if(code){
            this.props.slackConnect(code)
        } else if (error){
            history.push(`/app/${workplace}`)
        } else {
            window.location.assign(connectUrl);
        }    
    }

    render(){
        return null
    }
}

// const Slack = props => {
//     const { code, error } = qs.parse(props.location.search);
//     const workplace = localStorage.getItem("workplace")
//     if(code){
//         props.slackConnect(code)
//     } else if (error){
//         history.push(`/app/${workplace}`)
//     } else {
//         window.location.assign(connectUrl);
//     }
//     return null
// }

// const mapStateToProps = state => {
//     const { user: { workplace } } = state;
//     return {
//         ...state,
//         workplace
//     }
// }

const mapDispatchToProps = dispatch =>{
    return {
        slackConnect: (code) => {
            dispatch(dashboardActions.slackConnect(code))
        }
    }
}

export default connect(null, mapDispatchToProps)(Slack);
