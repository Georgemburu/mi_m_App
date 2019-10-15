import { SEND_MESSAGE, DELETE_FULL_CHAT, CHAT_ERROR, CHAT_LIVE_LISTENER, SET_CHAT_MESSAGES } from '../action.types';

import { firebase, auth, firestore } from '../../config/firebase';


export function SET_ChatMesssages(dispatch,$messagesArr){
    dispatch({
        type: SET_CHAT_MESSAGES,
        payload: {
            messages: $messagesArr,
            error: {
                type: null,
                message: null
            }
        }
    })
}

export function ACTIVATE_Chat_Listener(dispatch,cb=null){
    let currentUserId = auth().currentUser.uid;
    return firestore().collection('messages').doc(currentUserId).collection('WITH_ADMIN').orderBy('timeStamp','desc').onSnapshot((snapShot)=>{
        console.log('FROM CHAT LISTENER (snapshot)',snapShot)
        let messagesArr = [];
        snapShot.forEach((doc)=>{
            let docObj = {};
            let data = doc.data();
            docObj.id = doc.uid;
            docObj = {...docObj,...data};


            messagesArr.push(docObj);
        })
        console.log('FROM CHAT LISTENER (messageArr)',messagesArr)
        if(cb!==null){
            cb(messagesArr)
        }
        // dispatch({
        //     type: CHAT_LIVE_LISTENER,
        //     payload: {
        //         messages: [...messagesArr],
        //         error: {
        //             type: null,
        //             message: null
        //         }
        //     }
        // })
    })

}


export function SEND_Message(dispatch,$text,cb){
    let currentUserId = auth().currentUser.uid;
    return firestore().collection('messages').doc(currentUserId).collection('WITH_ADMIN').add({
        senderId: currentUserId,
        receiver: 'Admin',
        status: 'sent',
        text: $text,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((response)=>{
        dispatch({
            type: SEND_MESSAGE,
            payload: {
                messages: [$text],
                error: {
                    type: null,
                    message: null
                }
            }
            
        })
       

    }).catch((error)=>{
        dispatch({
            type: SEND_MESSAGE,
            payload: {
                messages: [],
                error: {
                    type: 'Send Message Error',
                    message: 'Error Sending Message, Try Again Later'
                }
            }
            
        })
       

    })

}
