import React, { Fragment } from 'react';
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

import { BRAND_NAME } from '../../constants/strings'

import AuthHeader from '../../components/dumb/headers/auth/index'
import AuthUserDefaultImage from '../../components/dumb/authUserDefaultImage'
import AuthForm from '../../components/dumb/authForm'

// store
import { connect } from 'react-redux';

// actions
import { HANDLE_userLoggedIn, HANDLE_userLoggedOut, LOGIN_user } from '../../store/actions/authAction'

// firebase
// import auth from '@react-native-firebase/auth';
import  { auth } from '../../config/firebase';

const WIDTH = Dimensions.get("window").width

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
            console.log('FROM LOGIN->current user is in',)
                this.navigateToHome()
        }else{

        
            this._unsubsribe = auth().onAuthStateChanged((user)=>{
                if(user){
                    console.log('User LOGED IN',user.displayName)
                    let $pyd1 = {
                        user: user,
                        isLoggedIn: true,
                        error: {
                            type: null,
                            message: null
                        }
                }
                    HANDLE_userLoggedIn(this.props.dispatch,$pyd1)
                    

                }else {
                    console.log('User LOGED OUT')

                    let $pyd2 = {
                        user: null,
                        isLoggedIn: false,
                        error: {
                            type: null,
                            message: null
                        }
                        }
                        HANDLE_userLoggedOut(this.props.dispatch,$pyd2)

                }
            })
        }

    }

    componentWillUnmount(){
        // unsubscribe firebase listener
        this._unsubsribe()

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

    handleLogin = ()=>{
        console.log('LOGGING IN')
        console.log(this.state)
        // do checks
        if(this.state.Email.value===''){
            this._errorElem.setNativeProps({text: '* Email cannot be empty'})
        }else if(this.state.Password.value===''){
            this._errorElem.setNativeProps({text: '* Password cannot be empty'})
        }else {
            // fields clear
            this._errorElem.setNativeProps({text: ''})

            let { dispatch } = this.props;
            let $payload = {
                Email: this.state.Email.value,
                Password: this.state.Password.value
            }
            LOGIN_user(dispatch,$payload)
            console.log('error in LOGIN',this.props.error)

        }



        
    }

    navigateToHome = ()=>{
        // navigate to home
            this.props.navigation.navigate('HomePage')
    }
    render(){
        let fields = this.state
        let {error} = this.props;
       
        return(
             <SafeAreaView style={styles.login}>
                    <AuthHeader />
                    <AuthUserDefaultImage />
                    <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: WIDTH
                    }}>
                        <TextInput 
                            defaultValue={error.message?error.message:''}
                            style={{
                                color: 'red',
                                fontSize: 12,

                            }}
                            editable = {false}
                            ref={component => this._errorElem = component}
                        />
                    </View>
                    
                    <AuthForm marginVertical={20} FIELDS={fields} HANDLE_FIELDS_CHANGE_FUNCTION={this.handleFieldsChange}/>
                    <View style={
                        {
                        display:"flex", 
                        alignItems:"center",
                        marginTop: 40
                        }
                        }>
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={()=>this.handleLogin()}
                        >
                            <Text style={styles.loginBtnTxt}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.createAcountBtn}
                            onPress={()=>this.props.navigation.navigate('SignUpPage')}
                            >
                            <Text style={styles.createAccountTxt}>Create Account</Text>
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
    login: {
        backgroundColor: "#121212",
        flex: 1,
    },
    loginBtn: {
        fontFamily: "Andika",
        fontSize: 20,
        width: 276,
        backgroundColor:"#3D2BB3",
        margin: "auto",
        height: 48,
        borderRadius: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    loginBtnTxt:{
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
    createAccountTxt: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "Andika"
    }
    
})

function mapStateToProps(state){
    console.log('login state to props',state)
    let { authReducer } = state
    return {
        isLoggedIn: authReducer.isLoggedIn,
        user: authReducer.user,
        error: authReducer.error
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);