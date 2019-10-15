import  { UPDATE_USER_PROFILE_DATA, GET_USER_PROFILE_DATA } from '../action.types';

import { auth, firestore } from '../../config/firebase';


export function GET_UserProfileData(dispatch,payload){
    let userId = auth().currentUser.uid;

    return firestore().collection('users').doc(userId).get().then((doc)=>{
        console.log('GOT USER DOC',doc)
        let docData = doc.data();
        dispatch({
            type: GET_USER_PROFILE_DATA,
            payload: {
                userDetails: {
                    Name:docData.Name?docData.Name:'',
                    Email:docData.Email?docData.Email:'',
                    Phone:docData.Phone?docData.Phone:'',
                    Location:docData.Location?docData.Location:''
                },
                error: {
                    type: null,
                    message: null
                }
            }
        })

    }).catch((error)=>{
        console.log('Error GETING user profile data',error)
        dispatch({
            type: GET_USER_PROFILE_DATA,
            payload: {
                userDetails: {
                    Name: '',
                    Email: '',
                    Phone: '',
                    Location: ''
                },
                error: {
                    type: GET_USER_PROFILE_DATA,
                    message: 'Could not get user profile data'
                }
            }
        })
    })

}


export function UPDATE_User_Profile(dispatch,payload={}){
    let { Name, Email, Phone, Location } = payload;
    return dispatch({
        type: GET_USER_PROFILE_DATA,
        payload: {
            userDetails: {
                Name: Name&&Name!==undefined?Name:'',
                Email: Email&&Email!==undefined?Email:'',
                Phone: Phone&&Phone!==undefined?Phone:'',
                Location: Location&&Location!==undefined?Location:''
            },
            error: {
                type: null,
                message: null
            }
        }
    })

}