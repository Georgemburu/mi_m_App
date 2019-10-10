import { GET_SHARED_DATA, SET_SHARED_DATA } from '../action.types';




export function SET_SharedData(dispatch,payload,cb){
     dispatch({
        type: SET_SHARED_DATA,
        payload: payload
    })
    
     setTimeOut(()=>{
        cb()
    },500)
}

export function GET_SharedData(){
    return dispatch({
        type: GET_SHARED_DATA,
    })
}