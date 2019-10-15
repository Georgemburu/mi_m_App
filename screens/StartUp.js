import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

// firebase
import { auth } from '../config/firebase';
//store
import { connect } from 'react-redux';
// actions
import  { GET_homeSliderImages, GET_newMoviesData } from '../store/actions/homeActions';
import  { GET_allMoviesData } from '../store/actions/moviesAction';
import { GET_AllSeries } from '../store/actions/seriesAction';

import  { HANDLE_userLoggedIn } from '../store/actions/authAction'

import { GET_UserProfileData } from '../store/actions/userProfileActions';

import { BRAND_NAME } from '../constants/strings'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width



class StartUpScreen extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        let {SET_IS_LOADING_FUNCTION } = this.props;
        // do some fetch here before app lauch
        console.log('START UP SCREEN')
        console.log('user inSTARTUPSCREEN->',auth())
        let user = auth?(auth().currentUser):null;
        if(user){
            // do  some fetch //(preload)
            // 1. fetch homeSLider Images
            // 2. fetch newMovies data
            // 3. fetch all movies

            let { dispatch } = this.props;
        
            HANDLE_userLoggedIn(dispatch,{
                isLoggedIn: true,
                user: auth().currentUser,
                error: {
                    type: null,
                    message: null
                }
            })
             GET_homeSliderImages(dispatch)
        
             GET_newMoviesData(dispatch)

             GET_allMoviesData(dispatch)
            
             GET_AllSeries(dispatch)

             GET_UserProfileData(dispatch)

             setTimeout(()=>{
                 console.log('calling is set is loading func')
                SET_IS_LOADING_FUNCTION(false,true)
              },1000)
            
        }else {
            setTimeout(()=>{
                console.log('calling is set is loading func')
                SET_IS_LOADING_FUNCTION(false,false)
              },1000)
        }
    }
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                    <View style={styles.startUpScreen}>
                        <Icon name="local-movies" size={80} color="#FFFFFF"/>
                        <View style={{height: 50}}></View>
                        <Text style={styles.brandName}>{BRAND_NAME}</Text>
                        <View style={{height: 50}}></View>
                        <ActivityIndicator size={30}/>
                    </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    startUpScreen: {
        backgroundColor: "#121212",
        height: HEIGHT,
        width: WIDTH,
        display: "flex",
        alignItems: "center",
        justifyContent:"center"
    },
    brandName: {
        color: "#A299AC",
        fontSize: 40,
        fontFamily: "ProstoOne",
        margin: "auto"
    }
})


// store
function mapStateToProps(state){
    let { homeReducer } = state;
    console.log('HOME STATE TO PROPS',state)
    return {
        homeSliderImages: homeReducer.homeSliderImages,
        newMovies: homeReducer.newMovies
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(StartUpScreen);