import { GET_ORDER_HISTORY, DELETE_HISTORY_BASED_BY_DAY } from '../action.types';

let initialState =  {
    orderHistoryData :[],
    error: {
        type: null,
        message: null
    }
}

function historyReducer(state=initialState,action){
    switch(action.type){
        case GET_ORDER_HISTORY:
            return {...state,orderHistoryData:[...action.payload.orderHistoryData],error:{...action.payload.error}};
            break;
        case DELETE_HISTORY_BASED_BY_DAY:
            return state;
            break;
        default:
            return state;
            break;
    }
}


export default historyReducer;