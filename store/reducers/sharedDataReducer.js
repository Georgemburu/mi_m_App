import { GET_SHARED_DATA, SET_SHARED_DATA } from '../action.types';

let initialState ={
    movieToViewDetailsFor:null
}

function sharedDataReducer(state=initialState,action){
    switch(action.type){
        case GET_SHARED_DATA: 
            return state;
            break;
        case SET_SHARED_DATA:
            initialState = {...state,...action.payload}
            return {...state,...action.payload};
            break;
        default: 
            return state;
            break;
    }
}

export default sharedDataReducer;