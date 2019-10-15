import React, { Fragment } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    ScrollView
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

// store
import { connect } from 'react-redux';
import { ACTIVATE_Chat_Listener, SEND_Message  } from '../store/actions/chatActions';

import You from '../components/dumb/chat/You';
import Me from '../components/dumb/chat/Me';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


class OpenInbox extends React.Component {
    state = {
        textMessage: '',
        messages: [
            // {
            //     from: 'admin',
            //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris',
            //     time: '19/01/2019',
            //     status: 'read'
            // },
            // {
            //     to: 'admin',
            //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris',
            //     time: '19/01/2019',
            //     status: 'read'
            // },
            // {
            //     from: 'admin',
            //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris',
            //     time: '19/01/2019',
            //     status: 'read'
            // },
            // {
            //     to: 'admin',
            //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris',
            //     time: '19/01/2019',
            //     status: 'read'
            // },
            // {
            //     to: 'admin',
            //     text: 'elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. oris',
            //     time: '19/01/2019',
            //     status: 'read'
            // },
            // {
            //     to: 'admin',
            //     text: 'elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. oris',
            //     time: '19/01/2019',
            //     status: 'read'
            // },
            // {
            //     from: 'admin',
            //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris',
            //     time: '19/01/2019',
            //     status: 'read'
            // },
            
        ]
    }

    componentDidMount(){
        let { dispatch } = this.props;
        // this._unsubscribe = ACTIVATE_Chat_Listener(dispatch)
    }
    handleDisplayHeader =()=>{
        return(
            <View style={{
                height: 49,
                width: WIDTH,
                backgroundColor: '#313131',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 5
            }}>
                <View></View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon 
                        name='forum'
                        size={30}
                        color='#EEE2D0'
                        style={{
                            marginRight: 5
                        }}
                    />
                    <Text style={{
                        color: '#EEE2D0',
                        fontFamily: 'RobotoSlab-Bold',
                        fontSize: 20
                    }}>Mi Movies</Text>
                </View>
                <View style={{

                }}>
                    <Icon 
                        name="local-movies"
                        color='#C8C8C8'
                        size={30}
                    />

                </View>
            </View>
        )
    }

    displayMessages = ($messagesArr)=>{
        return(
            <Fragment>
                {$messagesArr.length<1?(
                    <Text style={{
                        color: 'white',
                        marginLeft: 5
                    }}>No chats available. Chats appear here</Text>
                ):($messagesArr.map((msg, index)=>(
                    (msg.receiver!=='Admin'?(
                            <View key={index}>
                                <You MESSAGE_DATA={msg}/>
                            </View>
                        ):(
                            <View key={index}>
                                <Me MESSAGE_DATA={msg}/>
                            </View>
                        ))
                )))}
            </Fragment>
        )
    }

    handleTypingMessage = ($text)=>{
        this.setState({
            ...this.state,
            textMessage: $text
        })
    }
    handleSendMessage = ()=>{
        console.log('send message',this.state.textMessage);
        // send to server
        let { dispatch } = this.props;
        let { textMessage } = this.state;
        this._textInputForMsg.setNativeProps({text:''})
        SEND_Message(dispatch,textMessage)
        
    }

    componentWillUnmount(){
        // unsubscribe from live chat listener
        // this._unsubscribe()
    }

    render(){
        let { messages } = this.props;

        return (
            <SafeAreaView style={{flex:1,backgroundColor:'#121212'}}>
                {this.handleDisplayHeader()}
                <KeyboardAvoidingView  enabled style={{flex:1}} >
                    <ScrollView>
                <View style={styles.openInbox}>

                    <View style={styles.openInboxContentView}>
                        <ScrollView>
                            {this.displayMessages(messages)}

                        </ScrollView>
                    </View>
                    <View style={styles.editorView}>
                        <TextInput 
                            placeholder='Type Your Message'
                            placeholderTextColor='#999794'
                            style={styles.editorTxtInput}
                            selectionColor='green'
                            defaultValue = {this.state.textMessage}
                            onChangeText = {(text)=>this.handleTypingMessage(text)}
                            ref={component => this._textInputForMsg = component}
                        />
                        <TouchableOpacity 
                            onPress = {()=>this.handleSendMessage()}
                            style={{
                                backgroundColor: '#BD4D4D',
                                width: 50,
                                height: 48,
                                borderRadius: 4,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image 
                                source={require('../assets/images/send/1.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    openInbox: {
        flex: 1
    },
    openInboxContentView: {
        backgroundColor: '#151414',
        height: 350,
        marginTop: 5
    },
    editorView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 5,
        paddingLeft: 10,
        marginTop: 40
    },
    editorTxtInput: {
        backgroundColor: '#282828',
        height: 38,
        width: 245.7,
        borderRadius: 5,
        color: 'white'
    }
})

function mapStateToProps(state){
    console.log('OPEN INBOX mapping state to props',state)
    let { chatReducer } = state;
    return {
        messages: chatReducer.messages,
        chatError: chatReducer.error
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OpenInbox);