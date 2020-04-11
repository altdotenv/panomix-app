import { history } from "../configure"
import * as userActions from "./user"

const CONNECT_SUCCESS_ALERT = "dashboard/CONNECT_SUCCESS_ALERT"
const CONNECT_FAIL_ALERT = "dashboard/CONNECT_FAIL_ALERT"
const CONNECT_DEFAULT_ALERT = "dashboard/CONNECT_DEFAULT_ALERT"
// const GET_DASHBOARD_INFO = "dashboard/GET_DASHBOARD_INFO"

export const connect_success_alert = () => ({ type: CONNECT_SUCCESS_ALERT})
export const connect_fail_alert = () => ({ type: CONNECT_FAIL_ALERT})
export const conenct_default_alert = () => ({ type: CONNECT_DEFAULT_ALERT })
// export const get_dashboard_info = () => ({ type: GET_DASHBOARD_INFO })

export function getDashboardInfo(workplace){
    return function (dispatch, getState){
        const { user: { token } } = getState();
        fetch(`/api/workplace/${workplace}/info`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
        })
        .then(response => {
            if (response.status === 200){
                return response.json()
            } else if (response.status === 401){
                dispatch(userActions.logout())
                history.push("/")
                alert(response.statusText)
            } else if (response.status === 400){
                history.push("/")
                alert(response.statusText)
            } else {
                throw Error(response.statusText)
            }
          })
        .catch(error => console.log(error))
    }
}
export function slackConnect(code){
    return function (dispatch, getState){
        const { user: { token, workplace } } = getState();
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
                history.push(`/app/${workplace}`)
                dispatch(connect_success_alert())
                setTimeout(() => {
                dispatch(conenct_default_alert())
                }, 5000)
                return null
            } else if (response.status === 401){
                dispatch(userActions.logout())
                history.push("/")
                alert(response.statusText)
            } else {
                dispatch(connect_fail_alert())
                setTimeout(() => {
                    dispatch(conenct_default_alert())
                }, 5000)
                throw Error(response.statusText)
            }
        })
        // .then(() => {
        //     history.push(`/app/${workplace}`)
        // })
        .catch(error => console.log(error))
    }
}

const initialState = {
    is_connect_successed: null
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case CONNECT_SUCCESS_ALERT:
            return {...state, is_connect_successed:true}
        case CONNECT_FAIL_ALERT:
            return {...state, is_connect_successed:false}
        case CONNECT_DEFAULT_ALERT:
            return {...state, is_connect_successed:null}
        default:
            return state; 
    }
}