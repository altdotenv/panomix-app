import React from "react"
import qs from "query-string"
import { connect } from "react-redux"
import * as dashboardActions from "store/modules/dashboard"

const SLACK_CLIENT_ID = "934436568806.922065774977"
const AUTHORIZE_URI = "https://slack.com/oauth/authorize"

const queryStr = qs.stringify({
    client_id: SLACK_CLIENT_ID,
    scope: "identity.basic"
})

const connectUrl = AUTHORIZE_URI + "?" + queryStr

const Slack = props => {
    const { code, error } = qs.parse(props.location.search);

    if(!code){
        window.location.assign(connectUrl);
    } else if (error){
        alert(error)
    } else {
        props.slackConnect(code)
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
