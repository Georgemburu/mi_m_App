import { CREATE_NEW_USER_ACCOUNT, LOGIN_USER,USER_LOGGED_IN,USER_LOGGED_OUT, ERROR_LOGIN, SET_USER_PROFILE_DETAILS } from '../action.types';

// import auth from '@react-native-firebase/auth';
import { auth } from '../../config/firebase';

export function HANDLE_userLoggedIn(dispatch,payload){
    dispatch({
        type: USER_LOGGED_IN,
        payload
    })
}
export function HANDLE_userLoggedOut(dispatch,payload){
    dispatch({
        type: USER_LOGGED_OUT,
        payload
    })
}

export function CREATE_newUserAccount(dispatch,payload){
    let {Email,Password,Fullname} = payload;
    let fullnameArr = Fullname.split(' ')
    let $firstname = fullnameArr[0]?fullnameArr[0]:'';
    let $lastname = fullnameArr[1]?fullnameArr[1]:'';
    return auth().createUserWithEmailAndPassword(Email,Password).then((userData)=>{
        dispatch({
            type: CREATE_NEW_USER_ACCOUNT,
            
        })
    }).catch(error => {
        console.log('from ACTION',error)
    })
}


// login
export function LOGIN_user(dispatch,payload){
    let { Email, Password } = payload;

    return auth().signInWithEmailAndPassword(Email,Password).then((userData)=>{
        console.log('from firebase login',userData)
        dispatch({
            type: LOGIN_USER,
            payload: {
                user: userData,
                isLoggedIn: true
            }
        })
    }).catch((error)=>{
        console.log('Error from firebase login',error.message)
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
            type: ERROR_LOGIN,
            payload:{
                error: {
                    type: 'login',
                    message: corected_emsg
                }
            }
        })
    })
}
