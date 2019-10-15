import { GET_ORDER_HISTORY, DELETE_HISTORY_BASED_BY_DAY } from '../action.types';

import { firestore, auth } from '../../config/firebase';


export function GET_orderHistoryData(dispatch){
    let currentUserId = auth().currentUser.uid;

    return firestore().collection('orders').doc(currentUserId).collection('orders').get().then((querySnapShot)=>{
       
        let historyDataArr = [];
        querySnapShot.forEach((doc)=>{
            let docObj = {};
            let data = doc.data();
            if(!data||data===undefined){
                return
            }
            docObj.id = doc.id;
            docObj = {...docObj,...data};

            historyDataArr.push(docObj);
        })

        dispatch({
            type: GET_ORDER_HISTORY,
            payload: {
                orderHistoryData: historyDataArr,
                error: {
                    type: null,
                    message: null
                }
            }
        })


    }).catch((error)=>{

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
            type: GET_ORDER_HISTORY,
            payload: {
                orderHistoryData :[],
                error: {
                    type: 'Error Querying Order History',
                    message: corected_emsg
                }
            }
        })
    })
}