import { history } from "../configure"

//Actions
const SAVE_WORKPLACE = 'user/SAVE_WORKPLACE'
const LOGOUT = 'user/LOGOUT'
const INITIALIZE_WORKPLACE = "user/INITIALIZE_WORKPLACE"
const INITIALIZE_LOGIN = "user/INITIALIZE_LOGIN"
const WORKPLACE_NOT_EXIST = "user/WORKPLACE_NOT_EXIST"
const WORKPLACE_EXIST = "user/WORKPLACE_EXIST"
const SAVE_TOKEN = "user/SAVE_TOKEN"
// const EMAIL_EXIST = "user/EMAIL_EXIST"
// const EMAIL_NOT_EXIST = "user/EMAIL_NOT_EXIST"
const WORKPLACE_WITH_GOOGLE_NOT_EXIST = "user/WORKPLACE_WITH_GOOGLE_NOT_EXIST"
const WORKPLACE_WITH_GOOGLE_EXIST = "user/WORKPLACE_WITH_GOOGLE_EXIST"
const GOOGLE_EMAIL_EXIST = "user/GOOGLE_EMAIL_EXIST"
const GOOGLE_EMAIL_NOT_EXIST = "user/GOOGLE_EMAIL_NOT_EXIST"

//Action Creators
export const save_workplace = (workplace) => ({ type: SAVE_WORKPLACE, workplace })
export const logout = () => ({ type: LOGOUT })
export const initialize_login = () => ({ type:INITIALIZE_LOGIN })
export const initialize_workplace = () => ({ type: INITIALIZE_WORKPLACE })
export const workplace_not_exist = () =>({ type: WORKPLACE_NOT_EXIST })
export const workplace_exist = () =>({ type: WORKPLACE_EXIST })
export const save_token = (token) => ({ type:SAVE_TOKEN, token })
// export const email_exist = () => ({ type: EMAIL_EXIST })
// export const email_not_exist = () => ({ type: EMAIL_NOT_EXIST })
export const workplace_with_google_not_exist = () =>({ type: WORKPLACE_WITH_GOOGLE_NOT_EXIST })
export const workplace_with_google_exist = () =>({ type: WORKPLACE_WITH_GOOGLE_EXIST })
export const google_email_exist = () => ({ type: GOOGLE_EMAIL_EXIST })
export const google_email_not_exist = () => ({ type: GOOGLE_EMAIL_NOT_EXIST })

//Api Actions
export function checkWorkplace(workplace){
  return function (dispatch){
    fetch(`/api/workplace/${workplace}/check`, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      if (response.status === 200){
        return response.json()
        // console.log(response.json())
        // dispatch(save_workplace(response.json().name))
      } else if (response.status === 404){
        dispatch(workplace_not_exist())
      } else {
        throw Error(response.statusText)
      }
    })
    .then(json => {
      if (json !== undefined){
        dispatch(save_workplace(json.name))
      }
    })
    .catch(err => alert(err))
  }
}

// export function checkEmail(email){
//   return function (dispatch){
//     fetch(`/api/users/${email}/check`, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     })
//     .then(response => {
//       if (response.status === 200){
//         dispatch(save_workplace(response.json().name))
//       } else if (response.status === 404){
//         dispatch(workplace_not_exist())
//       } else {
//         throw Error(response.statusText)
//       }
//     })
//     .catch(err => alert(err))
//   }
// }

// export function userSignup(name, email, password, workplace){
//   return function (dispatch){
//     console.log(name, email, password, workplace)
//     fetch("/api/users/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name, email, password, workplace
//       })
//     })
//     .then(response => {
//       if(response.status === 201 || response.status === 406){
//         return response.json()
//         // dispatch(save_token(response.json().token))
//       } else {
//         throw Error(response.statusText)
//       }
//     })
//     .then(json => {
//       if (json.result === "workplace email exists"){
//         dispatch(workplace_exist())
//         dispatch(email_exist())
    
//       } else if (json.result === "workplace exists"){
//         dispatch(workplace_exist())
//       } else if (json.result === "email exists"){
//         dispatch(email_exist())
//       } else {
//         dispatch(save_token(json.access_token))
//       }
//     })
//     .catch(err => alert(err))
//   }
// }

export function userSignupWithGoogle(workplace, result){
  return function (dispatch){
    fetch("/api/users/google-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workplace, result
      })
    })
    .then(response => {
      if(response.status === 201 || response.status === 406){
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .then(json => {
      if (json.result === "workplace email exists"){
        dispatch(workplace_with_google_exist())
        dispatch(google_email_exist())
    
      } else if (json.result === "workplace exists"){
        dispatch(workplace_with_google_exist())
      } else if (json.result === "email exists"){
        dispatch(google_email_exist())
      } else {
        dispatch(save_token(json.access_token))
        dispatch(save_workplace(json.workplace))
        history.push("/app")
      }
    })
    .catch(err => alert(err))
  }
}
export function onLoginGoogle(result){
  return function (dispatch, getState){
    const { user : { workplace } } = getState()
    fetch("/api/users/google-login",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        result,
        workplace
      })
    })
    .then(response => {
      if(response.status === 200 || response.status === 401){
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .then(json => {
      if (json.message === "Wrong Token" || json.message === "Unauthorized User"){
        dispatch(google_email_not_exist())
      } else {
        dispatch(save_token(json.access_token))
        history.push("/app")
      }
    })
    .catch(error => console.log(error))
  }
}

//initial state
const initialState = {
    isLoggedIn: localStorage.getItem('jwt') ? true : false,
    token: localStorage.getItem("jwt"),
    workplace: localStorage.getItem("workplace"),
    has_workplace: false,
    email_exist: false
};
  
//reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
      case SAVE_WORKPLACE:
        localStorage.setItem("workplace", action.workplace)
        return {...state, workplace: action.workplace, has_workplace: true}
      case LOGOUT:
        localStorage.removeItem('jwt')
        localStorage.removeItem('workplace')
        return {...state, isLoggedIn:false}
      case INITIALIZE_LOGIN:
        return {...state, workplace:"", has_workplace:false, is_workplace_exist:true}  
      case INITIALIZE_WORKPLACE:
        return {...state, is_workplace_exist:false}
      case WORKPLACE_NOT_EXIST:
        return {...state, is_workplace_exist:false}
      case WORKPLACE_EXIST:
        return {...state, is_workplace_exist:true}
      case SAVE_TOKEN:
        localStorage.setItem('jwt', action.token)
        return {...state, token: action.token, isLoggedIn:true}
      // case EMAIL_EXIST:
      //   return {...state, email_exist: true}
      // case EMAIL_NOT_EXIST:
      //   return {...state, email_exist: false}
      case WORKPLACE_WITH_GOOGLE_EXIST:
        return {...state, is_workplace_with_google_exist:true}
      case WORKPLACE_WITH_GOOGLE_NOT_EXIST:
        return {...state, is_workplace_with_google_exist:false}
      case GOOGLE_EMAIL_EXIST:
        return {...state, google_email_exist: true}
      case GOOGLE_EMAIL_NOT_EXIST:
        return {...state, google_email_exist: false}
      default:
        return state; 
    }
}