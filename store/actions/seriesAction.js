import { GET_ALL_SERIES_DATA } from '../action.types';

import { auth, firestore } from '../../config/firebase';


export function GET_AllSeries(dispatch){

    return firestore().collection('series').get().then((querySnapShot)=>{
        let seriesArr = [];
        querySnapShot.forEach((doc)=>{
            let docObj = {};
            let data = doc.data();
            if(!data||data===undefined){
                return
            }
            docObj.id = doc.id;
            docObj.image = data.imageUrl;
            docObj = {...docObj,...data};

            seriesArr.push(docObj);
        })

        dispatch({
            type: GET_ALL_SERIES_DATA,
            payload: seriesArr
        });
    }).catch((error)=>{
        console.log('ERROR QUERYING ALL MOVIES DATA',error.message)
    })
}