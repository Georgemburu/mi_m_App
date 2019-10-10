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

import MainHeader from '../components/dumb/headers/main'

class Profile extends React.Component {
    Title = {
        title: 'Profile',
        icon: null,
        color: '#EEE2D0'
    }
    state = {
        userDetails: {
            Name: 'John Doe',
            Email: 'jdoe@gmail.com',
            Phone: '07652625262',
            Location: 'Kahigo'
        }
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
                                
                                <TextInput selectionColor={'white'} style={styles.txtInput} placeholder={$userDetails[ky]} placeholderTextColor='#A6A6A6' />
                            </View>
                    )
                })}
            </Fragment>
        )
    }
    handleChangeProfilePicture = ()=>{
        Alert.alert('change dp')
    
    }
    render(){
        let { userDetails } = this.state
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
                        <TouchableOpacity 
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
                        </TouchableOpacity>
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
                            <Text style={{
                                color: '#DFDBD5',
                                fontSize:20,
                                fontFamily: 'RobotoSlab'
                            }}>
                                Save 
                            </Text>
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


export default Profile;