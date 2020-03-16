//Actions
const SAVE_TOKEN = 'user/SAVE_TOKEN';
const LOGOUT = 'user/LOGOUT';

//Action Creators
export const save_token = (token) => ({ type: SAVE_TOKEN, token });
export const logout = () => ({ type: LOGOUT })

//Api Actions
export function checkWorkplace(workplace){
    return function (dispatch){
      fetch("/api/check/workplace/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          workplace
        })
      })
      .then(response => {
        if (response.status !== 200){
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(json => {
        dispatch(save_token(json.token))
      })
      .catch(error => alert(error))
    }
}

//initial state
const initialState = {
    isLoggedIn: localStorage.getItem('jwt') ? true : false,
    token: localStorage.getItem("jwt")
};
  
//reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
      case SAVE_TOKEN:
        localStorage.setItem('jwt', action.token)
        return {...state, token: action.token, info: action.info, isLoggedIn:true}
      case LOGOUT:
        localStorage.removeItem('jwt')
        return {...state, isLoggedIn:false}
      default:
        return state; 
    }
}