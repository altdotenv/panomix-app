import qs from "query-string"
import { connect } from "react-redux"
import * as dashboardActions from "store/modules/dashboard"
import { history } from "store/configure"

const SLACK_CLIENT_ID = "934436568806.922065774977"
const AUTHORIZE_URI = "https://slack.com/oauth/v2/authorize"

const queryStr = qs.stringify({
    client_id: SLACK_CLIENT_ID,
    scope: "app_mentions:read,channels:join,channels:manage,chat:write,files:write,im:read,incoming-webhook,users:read"
})

const connectUrl = AUTHORIZE_URI + "?" + queryStr

const Slack = props => {
    const { code, error } = qs.parse(props.location.search);

    if(code){
        props.slackConnect(code)
    } else if (error){
        history.push("/app")
    } else {
        window.location.assign(connectUrl);
    }
    return null
}

const mapDispatchToProps = dispatch =>{
    return {
        slackConnect: code => {
            dispatch(dashboardActions.slackConnect(code))
        }
    }
}

export default connect(null, mapDispatchToProps)(Slack);
