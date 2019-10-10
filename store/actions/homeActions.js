import { GET_HOME_SLIDER_IMAGES, GET_NEW_MOVIES_DATA } from '../action.types';

// import firestore from '@react-native-firebase/firestore'
import { firestore } from '../../config/firebase';

export function GET_homeSliderImages(dispatch){
    return firestore().collection('homeSliderImages').get().then((querySnapShot)=>{
        let homeSliderImagesArr = []
        querySnapShot.forEach((doc)=>{
            let docDataObj = {}
            let data = doc.data()
            docDataObj.id = doc.id;
            docDataObj.imageUrl = data.imageUrl;
            docDataObj.title = data.title;
            homeSliderImagesArr.push(docDataObj)
        })
        // dispatch
        dispatch({
            type: GET_HOME_SLIDER_IMAGES,
            payload: homeSliderImagesArr
        })
    }).catch((error)=>{
        console.log('ERROR QUERYING homeSLiderImages',error.message)
    })
}

export function GET_newMoviesData(dispatch){
    return firestore().collection('newMovies').get().then((querySnapShot)=>{
        let newMoviesArr = []
        querySnapShot.forEach((doc)=>{
            let docDataObj = {};
            let data = doc.data();
            docDataObj.id = doc.id;
            docDataObj.image = data.imageUrl;
            docDataObj = {...docDataObj,...data}

            newMoviesArr.push(docDataObj)
        })

        dispatch({
            type: GET_NEW_MOVIES_DATA,
            payload: newMoviesArr
        })
    }).catch((error)=>{
        console.log('ERROR QUERYING NEW MOVIES DATA',error.message)
    })
}