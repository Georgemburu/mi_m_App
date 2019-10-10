import React, { Fragment } from 'react';
import  {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import combinedReducers from './store';
const appStore = createStore(combinedReducers,compose(applyMiddleware(thunk,logger),window.devToolsExtension ? window.devToolsExtension() : f => f))

import StartUpScreen from './screens/StartUp'
import RootNavigator,{ SIGNED_IN_USER_NAVIGATOR } from './navigator'

class App extends React.Component {

  componentDidMount(){
    SplashScreen.hide();
  }

  state = {
    isLoading: true,
    userLoggedIn: false,
  }

  setIsloadingState = ($state,$userIsLoggedIn)=>{
    console.log('called setIsLoading function')
    this.setState({
      ...this.state,
      isLoading: $state,
      userLoggedIn: $userIsLoggedIn?$userIsLoggedIn:false
    })
  }

  renderMainAppComponent=()=>{ 
      return (
        <Provider store={appStore}>
          {this.state.userLoggedIn===true?(
              <SIGNED_IN_USER_NAVIGATOR />
          ):(
            <RootNavigator />
          )}
        </Provider>
      )
  }
  renderStartupScreen = ()=>{
    return (
      <View style={{flex:1}}>
        <Provider store={appStore}>        
          < StartUpScreen SET_IS_LOADING_FUNCTION={this.setIsloadingState}/>
        </Provider>
      </View> 
    )
  }

  render(){
    return (
      <Fragment>
        {this.state.isLoading==true?(
          this.renderStartupScreen()
          ):(
            this.renderMainAppComponent()
          )}
      </Fragment>
      )
    }
}



export default App;
