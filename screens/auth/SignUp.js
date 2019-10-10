import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import AuthHeader from '../../components/dumb/headers/auth/index'
import AuthUserDefaultImage from '../../components/dumb/authUserDefaultImage'
import AuthForm from '../../components/dumb/authForm'

const WIDTH = Dimensions.get("window").width

// start store
import { connect } from 'react-redux';
import { CREATE_newUserAccount, HANDLE_userLoggedIn, HANDLE_userLoggedOut } from '../../store/actions/authAction'

// end store
// firebase
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import  { auth, firestore } from '../../config/firebase';

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Fullname: {
                value: '',
                iconName: 'person',
                secureText: false,
                placeholderText: 'Type your fullname'
            },
            Email: {
                value: '',
                iconName: 'email',
                secureText: false,
                placeholderText: 'Type your email'
            },
            Password: {
                value: '',
                iconName: 'lock',
                secureText: true,
                placeholderText: 'Password'
            },
        }
    }

    
    componentDidMount(){
        if(auth().currentUser){
            this.navigateToHome()
        }else {

        this.unsubscribe =  auth().onAuthStateChanged((user)=>{
                if(user){
                    let $pyd1 = {
                            user: user,
                            isLoggedIn: true
                    }
                    HANDLE_userLoggedIn(this.props.dispatch,$pyd1)
                        // check if user is registering for first time
                        if(this.stateNotEmpty){
                            // update user profile
                            let fullnameArr = this.state.Fullname.value.split(' ');
                            let correctedFullname = '';
                            fullnameArr.forEach((name)=>{
                                if(name===' '||name==='')return;
                                let nm = '';
                                let cha_A = name.charAt(0);
                                nm+=cha_A.toUpperCase();
                                nm+=name.slice(1,);
                                correctedFullname+=nm+' ';
                            })
                            console.log('corrected fullname',correctedFullname)
                            
                            user.updateProfile({
                                displayName: correctedFullname
                            }).then(()=>{
                                // update successfull
                            console.log('USER LOGGED IN (NAME):',auth().currentUser.displayName)
                            console.log('USER LOGGED IN (user):',auth().currentUser)
                            console.log('USER LOGGED IN (uid):',auth().currentUser.uid)

                            }).catch((err)=>{
                                console.log('error updating username',user.displayName)
                            })
                            
                    }else {
                        console.log('USER LOGGED IN (NAME):',auth().currentUser.displayName)
                        console.log('USER LOGGED IN (user):',auth().currentUser)
                        console.log('USER LOGGED IN (uid):',auth().currentUser.uid)
                    }

                    
                    
                }else {
                    console.log('USER LOGGED OUT')
                    let $pyd2 = {
                            user: null,
                            isLoggedIn: false
                    }
                    HANDLE_userLoggedOut(this.props.dispatch,$pyd2)
                }
            })
        }
    }
    componentWillUnmount(){
        this.unsubscribe()
    }

    stateNotEmpty=()=>{
        if(
            this.state.Fullname.value&&this.state.Fullname.value!=='' &&
            this.state.Email.value&&this.state.Email.value!=='' &&
            this.state.Password.value&&this.state.Password.value!==''
            ){
        return true
        }else {
            return false
        }
    }

    navigateToHome = ()=>{
        // navigate to home
            this.props.navigation.navigate('HomePage')
    }

    handleFieldsChange = ($text,$fieldName)=>{
        // change state
        this.setState({
            ...this.state,
            [$fieldName]: {
                ...this.state[$fieldName],
                value: $text
            }
        })
    }
    handleSignUp = ()=>{
        console.log('SIGNING UP')
        console.log(this.state)

        // do checks
        let {Fullname,Email,Password} = this.state;
        if(Fullname.value===''){
            this._errorMesgComponent.setNativeProps({text: '* Fullname cannot be empty'});
        }else if(Email.value===''){
            this._errorMesgComponent.setNativeProps({text: '* Email cannot be empty'});

        }else if(Password.value===''){
            this._errorMesgComponent.setNativeProps({text: '* Password cannot be empty'});

        }else if(Email.value.includes('@')===false ||Email.value.includes('.')===false){
            this._errorMesgComponent.setNativeProps({text: '* Please Input a valid email'});
            
        }else if(Password.value.length<6){
            this._errorMesgComponent.setNativeProps({text: '* Password must be of atleast 6 characters'});
            
        }else {
            // all clear submit to server
            let payload = {
                Fullname: Fullname.value,
                Email: Email.value,
                Password: Password.value
            }
            CREATE_newUserAccount(this.props.dispatch,payload).then((user)=>{
                console.log('returned',user)
            }).catch((error)=>{
                console.log('errror',error)
                this._errorMesgComponent.setNativeProps({text: 'Error creating account. Please try again'});
            })
            
        }



        
    }
    render(){
        let fields = this.state
        let { error } = this.props;
        return(
            <SafeAreaView style={{flex:1,backgroundColor: "#121212"}}>
                <AuthHeader />
                <AuthUserDefaultImage />
                <View style={{
                    width: WIDTH,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TextInput 
                        defaultValue={error.message?error.message:''}
                        editable={false}
                        style={{
                            color: 'red',
                            fontSize:12
                        }}
                        ref={component => this._errorMesgComponent=component}
                    />
                </View>
                
                <AuthForm marginVertical={5} FIELDS = {fields} HANDLE_FIELDS_CHANGE_FUNCTION={this.handleFieldsChange}/>

                <View style={
                        {
                        display:"flex", 
                        alignItems:"center",
                        marginTop: 40
                         }
                         }>
                        <TouchableOpacity
                            style={styles.signUpBtn}
                            onPress = {()=> this.handleSignUp()}
                        >
                            <Text style={styles.signUpBtnTxt}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.createAcountBtn}
                            onPress={()=>this.props.navigation.pop()}
                            >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View 
                    style={{
                        display: "flex",
                        width: WIDTH
                    }}>
                        <Icon 
                            name="local-movies"
                            color="#ffffff"
                            size={40}
                            style={{
                                marginLeft: WIDTH-40
                            }}
                        />
                    </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    signUpBtn: {
        fontFamily: "Andika",
        fontSize: 20,
        width: 276,
        backgroundColor:"transparent",
        borderColor:"#DDD6D6",
        borderWidth: 1,
        margin: "auto",
        height: 48,
        borderRadius: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    signUpBtnTxt:{
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "Andika"
    },
    createAcountBtn: {
        width: 276,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "Andika"
    }
})



// store setup
function mapStateToProps(state){
    // let  {authReducer,isLoggedIn,user} = state
    // return {
    //     authReducer,
    //     isLoggedIn,
    //     user
    // }
    let { authReducer } = state
    return {
        isLoggedIn: authReducer.isLoggedIn,
        user: authReducer.user,
        error: authReducer.error
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch:dispatch
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)