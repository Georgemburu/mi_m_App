import { CREATE_NEW_USER_ACCOUNT, LOGIN_USER, USER_LOGGED_IN, USER_LOGGED_OUT, SET_USER_PROFILE_DETAILS, ERROR_LOGIN } from '../action.types';

let initialState = {
    isLoggedIn: false,
    user: null,
    error:{
        type: null,
        message: null
    }
}
function authReducer(state=initialState,action){
    switch(action.type){
        case CREATE_NEW_USER_ACCOUNT:
            // return state;
            return {...state,...action.payload}
            break;
        case LOGIN_USER: 
            // return state;
            return {...state,...action.payload}
            break;
        case USER_LOGGED_IN:
            // initialState = {...state,...action.payload}
            // return state
            return {...state,...action.payload}
            break;
        case USER_LOGGED_OUT:
            // initialState = {...initialState,...action.payload}
            // return state
            return {...state,...action.payload}
            break;
        case SET_USER_PROFILE_DETAILS: 
            return {...state,...action.payload}
            break;
        case ERROR_LOGIN: 
            return {...state,...action.payload}
            break;
        default:
            return state;
            break;
    }
}

export default authReducer;