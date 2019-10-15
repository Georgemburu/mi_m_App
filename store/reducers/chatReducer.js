import { SEND_MESSAGE, DELETE_FULL_CHAT, CHAT_ERROR, CHAT_LIVE_LISTENER, SET_CHAT_MESSAGES  } from '../action.types';

let initialState = {
    messages: [],
    error: {
        type: null,
        message: null
    }
}


function chatReducer(state=initialState,action){
    switch(action.type){
        case SEND_MESSAGE: 
            console.log('SEND MESSAGE REDUCER received',action.payload)
            // return {...state,messages:[...state.messages,...action.payload.messages],error:{...action.payload.error}};
            return state;
            break;
        case DELETE_FULL_CHAT:
            return state;
            break;
        case CHAT_ERROR:
            return state;
            break;
        case CHAT_LIVE_LISTENER:
            console.log('REACHED CHAT LIVE SERVER reducer',action.payload)
            // return {...state,messages:[...action.payload.messages],error:{...action.payload.error}};
            return action.payload;
            break;
        case SET_CHAT_MESSAGES:
            console.log('REACHED SET_CHAT_MESSAGES reducer');
            return action.payload;
        default:
            return state;
            break;
    }
}


export default chatReducer;
