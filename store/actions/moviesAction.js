import { GET_ALL_MOVIES_DATA } from '../action.types';

import { firestore } from '../../config/firebase';


export function GET_allMoviesData(dispatch){
    return firestore().collection('movies').get().then((querySnapShot)=>{
        let moviesArr = [];
        querySnapShot.forEach((doc)=>{
            let docObj = {};
            let data = doc.data();
            if(!data||data===undefined){
                return
            }
            docObj.id = doc.id;
            docObj.image = data.imageUrl;
            docObj = {...docObj,...data};

            moviesArr.push(docObj);
        })

        dispatch({
            type: GET_ALL_MOVIES_DATA,
            payload: moviesArr
        });
    }).catch((error)=>{
        console.log('ERROR QUERYING ALL MOVIES DATA',error.message)
    })
    
}