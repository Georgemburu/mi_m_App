import  { ADD_TO_CART, GET_ALL_CART_DATA, REMOVE_A_PARTICULAR_MOVIE_FROM_CART, SEND_ORDER, CART_ERRORS } from '../action.types';

let initialState = {
    cartItems: [],
    error: {
        type: null,
        message: null
    }
};

function cartReducer(state=initialState,action){
    switch(action.type){
        case ADD_TO_CART: 
            // return state;
            let newState = {...state,cartItems:[...state.cartItems,action.payload.cartItems],error:{...state.error,...action.payload.error}}
            return newState;
            break;
        case GET_ALL_CART_DATA:
            // return state;
            return state;
            break;
        case REMOVE_A_PARTICULAR_MOVIE_FROM_CART:
            let newStateAfterDel = {...state,cartItems:[...action.payload.editedState],errors: {...action.payload.error}}
            return newStateAfterDel;
            break;
        case SEND_ORDER: 
            return action.payload;
            break;
        case CART_ERRORS:
            return action.payload;
            break;
        default: 
            return state;
            break;
    }
}

export default cartReducer;