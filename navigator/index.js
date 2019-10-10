
import  { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'

import Login from '../screens/auth/Login'
import SignUp from '../screens/auth/SignUp'

import MovieDetails from '../screens/MovieDetails'
import CategoryMoviesList from '../screens/CategoryMoviesList'

// startup screen
import StartUpScreen from '../screens/StartUp';

const StartUpScreenNavigator = createStackNavigator({
    StartUpScreen: StartUpScreen
},{
    initialRouteName:"StartUpScreen",
    defaultNavigationOptions: {
        header: null,
      
    }
})


import SCREENROUTES from './screensImports'

const AuthNavigator = createStackNavigator({
    LoginPage: Login,
    SignUpPage: SignUp
},{
    initialRouteName:"LoginPage",
    defaultNavigationOptions: {
        header: null,
      
    }
})

const MovieDetailsNavigator = createStackNavigator({
    MovieDetailsPage: MovieDetails
},{
    initialRouteName: 'MovieDetailsPage',
    defaultNavigationOptions: {
        header: null,
      
    },
    
})

const MovieCategoryListingNavigator = createStackNavigator({
    CategoryMoviesListPage: CategoryMoviesList,

},{
    initialRouteName: 'CategoryMoviesListPage',
    defaultNavigationOptions: {
        header: null,
      
    }
})
// content component
import React from 'react'

import { Text } from 'react-native'

import DrawerContentComponent from '../components/containers/drawerOpen'
const AppNavigator = createDrawerNavigator({
    // StartUpScreenPage: StartUpScreenNavigator,
    AuthPage: AuthNavigator,
    // HomePage:Home ,
    ...SCREENROUTES,

    MovieDetailsPage: MovieDetailsNavigator,
    // MovieCategoryListingPage: MovieCategoryListingNavigator
},
{
    initialRouteName: "AuthPage",
    drawerType: 'front',
    contentComponent: (navigation)=>{
        return(
            <DrawerContentComponent navigation={navigation}/>
        )
    }
})

const SIGNED_IN_USER_NAVIGATOR_creation = createDrawerNavigator({
    // StartUpScreenPage: StartUpScreenNavigator,
    // HomePage:Home ,
    ...SCREENROUTES,

    MovieDetailsPage: MovieDetailsNavigator,
    // MovieCategoryListingPage: MovieCategoryListingNavigator
},
{
    initialRouteName: "HomePage",
    drawerType: 'front',
    contentComponent: (navigation)=>{
        return(
            <DrawerContentComponent navigation={navigation}/>
        )
    }
})

export const SIGNED_IN_USER_NAVIGATOR = createAppContainer(SIGNED_IN_USER_NAVIGATOR_creation)

const RootNavigator = createAppContainer(AppNavigator)

export default RootNavigator;