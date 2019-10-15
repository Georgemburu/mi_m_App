import  { ADD_TO_CART, GET_ALL_CART_DATA, REMOVE_A_PARTICULAR_MOVIE_FROM_CART, SEND_ORDER, CART_ERRORS } from '../action.types';

// firebase
import { firestore, auth, firebase } from '../../config/firebase';


export function ADD_ToCart(dispatch,payload){

    return dispatch({
        type: ADD_TO_CART,
        payload: {
            cartItems: payload,
            error: {
                type: null,
                message: null
            }
            
        }
    })
}

export function GET_AllCartData(dispatch){
    return dispatch({
        type: GET_ALL_CART_DATA
    })
}

export function REMOVE_AParticularMovieFromCart(dispatch,itemToRemove,editedState){
    return dispatch({
        type: REMOVE_A_PARTICULAR_MOVIE_FROM_CART,
        payload: {
            itemToRemove: itemToRemove,
            editedState: editedState,
            error: {
                type: null,
                message: null
            }
        }
    })
}

export function SEND_order(dispatch,payload){
    let currentUserId = auth().currentUser.uid; 
    let pyld = [];
    pyld = [...payload];
    return firestore().collection('orders').doc(currentUserId).collection('orders').doc(String(Date.now())).set({
        orders: [...payload],
        time: firebase.firestore.FieldValue.serverTimestamp()
    }).then((response)=>{
        dispatch({
            type: SEND_ORDER,
            payload: {
                cartItems: [],
                error: {
                    type: null,
                    message: null
                }
                
            }
        })
    }).catch((error)=>{
        console.log('ERROR sending ORDER to db',error)
        let emsg = error.message.split('[')[1];
        emsg = emsg.split(']')[0]
        emsg = emsg.split('/')[1]
        emsg = emsg.replace('-',' ')
        let corected_emsg = '';
        let arr = emsg.split(' ');
        arr.forEach((wrd)=>{
            let newW = '';
            newW+=wrd.charAt(0).toUpperCase()
            newW+=wrd.slice(1,)
            newW+=' '
            corected_emsg+=newW;
        })
        dispatch({
            type: CART_ERRORS,
            payload: {
                cartItems: [],
                error: {
                    type: 'Send_Orders',
                    message: corected_emsg
                }
                
            }
        })
    })
}