import { history } from "../configure"
import * as userActions from "./user"

const SLACK_OAUTH = "dashboard/SLACK_OAUTH"

export const slack_oauth = () => ({ type: SLACK_OAUTH })

export function slackConnect(code){
    return function (dispatch, getState){
        const { user: { token, workplace } } = getState();
        console.log(token)
        fetch(`/api/workplace/connect/slack`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                workplace,
                code
            })        
        })
        .then(response => {
            if (response.status === 200){
                history.push("/app")
                return response.json()
            } else if (response.status === 401){
                dispatch(userActions.logout())
                history.push("/")
                alert(response.statusText)
            } else {
                throw Error(response.statusText)
            }
          })
        // .then(json => {
        //     history.push("/app")
        // })
        .catch(error => console.log(error))
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state; 
    }
}