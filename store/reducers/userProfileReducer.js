import { UPDATE_USER_PROFILE_DATA, GET_USER_PROFILE_DATA } from '../action.types';

let initialState = {
    userDetails: {
        Name: '',
        Email: '',
        Phone: '',
        Location: ''
    },
    error: {
        type: null,
        message: null
    }
}


function userProfileReducer(state=initialState,action){
    switch(action.type){
        case GET_USER_PROFILE_DATA:
            return {...action.payload};
            break;
        case UPDATE_USER_PROFILE_DATA:
            return {...action.payload};
            break;
        default:
            return state;
            break;
    }
}

export default userProfileReducer;

