import React, { Fragment } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView
} from 'react-native'

// app context
import { AppContextConsumer } from '../contextApi';

// store
import { auth, firestore } from '../config/firebase';
import { connect } from 'react-redux';

import { UPDATE_User_Profile } from '../store/actions/userProfileActions';

import { HANDLE_userLoggedOut, HANDLE_userLoggedIn } from '../store/actions/authAction';

import MainHeader from '../components/dumb/headers/main'

class Profile extends React.Component {
    Title = {
        title: 'Profile',
        icon: null,
        color: '#EEE2D0'
    }
    state = {
        userDetails: {
            Name: '',
            // Email: '',
            Phone: '',
            Location: ''
        }
    }

    componentDidMount(){
        //    upadte user details
        // if(auth().currentUser){
        //     let userName = auth().currentUser.displayName;
        //     let userEmail = auth().currentUser.email;
        //     let userPhone = auth().currentUser.phoneNumber;
           
        //     this.setState({
        //         ...this.state,
        //         userDetails:{
        //             ...this.state.userDetails,
        //             Name: userName,
        //             Email: userEmail,
        //             Phone: userPhone
        //         }
        //     })
        // }
    }

    handleUserProfileDetailsUpdate = ()=>{
        if(auth().currentUser){
            let userName = auth().currentUser.displayName||this.props.userDetails.Name;
            let userEmail = auth().currentUser.email;
            let userPhone = auth().currentUser.phoneNumber||this.props.userDetails.Phone;

            let {  Name,Email,Phone,Location } = this.state.userDetails;

            if(userName!==Name && Name!=='' ||  userPhone!==Phone&&Phone!=='' || this.props.userDetails.Location!==Location&&Location!==''){
                console.log('SAVIIIIING')
                // update name
                if(this._saveBtnRef!==undefined){
                    this._saveBtnRef.setNativeProps({text:'Loading...'})
                }
                console.log('DETAILS(')
                console.log('name',Name,'ends to',Name===''?userName:Name)
                console.log('email',Email,'ends to',userEmail)
                console.log('phone',Phone,'ends to',Phone===''?userPhone:Phone)
                console.log('location',Location,'ends to',Location===''?this.props.userDetails.Location:Location)
                console.log(')')

               

                 // save data on user collection
                 let userId = auth().currentUser.uid;
                 let $newName = Name===''?userName:Name;
                 let $newEmail = userEmail;
                 let $newPhone = Phone===''?userPhone:Phone;
                 let $newLocation = Location===''?this.props.userDetails.Location:Location;
                 firestore().collection('users').doc(userId).set({
                     Name: $newName,
                     Email: $newEmail,
                     Phone: $newPhone,
                     Location: $newLocation
                 }).then(()=>{
                     // success
                    //  Alert.alert('Success','Successfull updated profile')
                    auth().currentUser.updateProfile({
                        displayName: $newName,
                        email: $newEmail,
                        phoneNumber: $newPhone
                    }).then(()=>{
                        console.log('Save success')
                        // success
                        if(this._saveBtnRef!==undefined){
                            this._saveBtnRef.setNativeProps({text:'Saved'})
                            setTimeout(()=>{
                                this._saveBtnRef.setNativeProps({text:'Save'})
                            },500)
    
                        }
                        // dispatch
                        let { dispatch } = this.props;
                        UPDATE_User_Profile(dispatch,{
                            Name: $newName,
                            Email: $newEmail,
                            Phone: $newPhone,
                            Location: $newLocation
                        })
                        
    
                    }).catch((error)=>{
                        console.log('Error saving',error)
                        // error
                        if(this._saveBtnRef!==undefined){
                            this._saveBtnRef.setNativeProps({text:'Error'})
                            setTimeout(()=>{
                                this._saveBtnRef.setNativeProps({text:'Save'})
                            },500)
    
                        }
                        
                    })
                 }).catch((error)=>{
                    console.log('Error saving',error)
                    // error
                    if(this._saveBtnRef!==undefined){
                        this._saveBtnRef.setNativeProps({text:'Error'})
                        setTimeout(()=>{
                            this._saveBtnRef.setNativeProps({text:'Save'})
                        },500)

                    }
                 })
            }else {
                console.log('CANNOT SAVE , NOTHING CHANGED')
            }
          

        }
    }
    handleUserDetailsInputsTextChange = (field,$text)=>{
        this.setState({
            ...this.state,
            userDetails: {
                ...this.state.userDetails,
                [field]:$text
            }
        })
    }

   
    renderUserInfoForm = ($userDetails)=> {
        let $keys = Object.keys($userDetails)
        
        return (
            <Fragment> 
                {$keys.map((ky,index)=>{
                    return(
                        <View key={index} style={styles.formItemView}>
                                <View style={{
                                    width: 100
                                }}>
                                    <Text style={styles.formLabel}>{ky}:</Text>
                                </View>
                                {ky.toLowerCase()==='email'?(

                                    <TextInput 
                                    autoCorrect={false} 
                                    selectionColor={'white'} 
                                    style={styles.txtInput} 
                                    defaultValue={$userDetails[ky]} 
                                    placeholderTextColor='#A6A6A6' 
                                    editable={false}
                                    // onChangeText ={text => this.handleUserDetailsInputsTextChange(ky,text)}
                                    />
                                ):(
                                    <TextInput 
                                    autoCorrect={false} 
                                    selectionColor={'white'} 
                                    style={styles.txtInput} 
                                    defaultValue={$userDetails[ky]} 
                                    placeholderTextColor='#A6A6A6' 
                                    onChangeText ={text => this.handleUserDetailsInputsTextChange(ky,text)}
                                    />
                                )}
                                
                            </View>
                    )
                })}
            </Fragment>
        )
    }
  
  
    render(){
        let { userProfileDataError, userDetails } = this.props;
        if(this.props.userIsLoggedIn===false || auth().currentUser === null){
            this.props.navigation.navigate('loginPage')
        }
        // let { userDetails } = this.state
        let userImage = require('../assets/images/user/user1.png')
        return (
            <SafeAreaView style={{flex:1}}>
                
            <View style={styles.profile}>
                <MainHeader TITLE={this.Title}/>
                <KeyboardAvoidingView enabled style={{flex:1}} >                           
                <ScrollView style={[{flex:1, minHeight: 300}]} >
                <View style={{justifyContent: 'flex-end'}} >
                    <View style={{
                        // marginLeft: 32,
                        marginTop: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: 'black',
                        width: 140
                    }}>
                        <View style={{
                            backgroundColor: '#2A2A2A',
                            width: 103,
                            height: 103,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            marginBottom: 3
                        }}>
                        <Image 
                            source={userImage}
                            style={{
                                // marginBottom: 3
                            }}
                        />
                        </View>
                        
                                {/* <TouchableOpacity 
                                onPress = {()=>this.handleChangeProfilePicture()}
                                style={{
                                    backgroundColor: '#2A2A2A',
                                    width: 103,
                                    height: 38,
                                    borderRadius: 20,
                                    display: 'flex',
                                    justifyContent:'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text 
                                    style={{
                                        color: '#E6E6E6',
                                        fontFamily: 'RobotoSlab',
                                        fontSize: 10
                                    }}
                                >Change Picture</Text>
                            </TouchableOpacity> */}
                            
                        
                       
                
                    </View>
                    <View style={styles.profileFormView}>
                        {this.renderUserInfoForm(userDetails)}   
                    </View>
                    
                    <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <TouchableOpacity
                            onPress = {()=>this.handleUserProfileDetailsUpdate()}
                            style={{
                                width: 161.3,
                                height: 54,
                                backgroundColor: '#AA6868',
                                borderRadius: 27,
                                display:'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {/* <Text style={{
                                color: '#DFDBD5',
                                fontSize:20,
                                fontFamily: 'RobotoSlab'
                            }}>
                                Save 
                            </Text> */}
                            <TextInput 
                                editable ={false}
                                defaultValue = {'Save'}
                                style={{
                                    color: '#DFDBD5',
                                    fontSize:20,
                                    fontFamily: 'RobotoSlab'
                                }}
                                ref = {component => this._saveBtnRef = component}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                </ScrollView>
                </KeyboardAvoidingView>
            </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    profile: {
        backgroundColor: '#121212',
        flex: 1
    },
    profileBody: {
        height: 185,
        // backgroundColor: 'gray',
       
    },
    formItemView: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    profileFormView: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        padding: 10
    },
    formLabel: {
        color: '#D2D2D1',
        fontFamily: 'RobotoSlab',
        // fontFamily: 'Andida',
        fontSize: 20,
        marginRight: 10,
    },
    txtInput: {
        backgroundColor: '#393737',
        width: 199,
        height: 29,
        borderRadius: 10,
        color: 'white',

    }
})

function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch
    }
}

function mapStateToProps(state){
    return {
        userIsLoggedIn: state.authReducer.isLoggedIn,
        userDetails: state.userProfileReducer.userDetails,
        userProfileDataError: state.userProfileReducer.error
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);