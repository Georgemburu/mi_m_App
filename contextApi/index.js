import React from 'react';
// context
let Appcontext = React.createContext();
let ContextProvider = Appcontext.Provider
export let AppContextConsumer = Appcontext.Consumer;


export class AppContextProvider extends React.Component{
    state = {
        isLoggedIn: true
    }
    handleChangeIsLoggedInState = ($state)=>{
        console.log('CALLED IS LOGGED IN CHANGE STATE IN APP FN')
        this.setState({
          ...this.state,
          userLoggedIn: $state
        })
      }
    render(){
        return(
            <ContextProvider value={{
                changeIsloggedInAppState :this.handleChangeIsLoggedInState,
                isUserLoggedInState: this.state.isLoggedIn
              }}>
                {this.props.children}
            </ContextProvider>
        )
    }
}

export default Appcontext;