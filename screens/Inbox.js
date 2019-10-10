import React, { Fragment } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    Modal
} from 'react-native'

import MainHeader from '../components/dumb/headers/main'
import OpenInbox from './OpenInbox';

import Icon from 'react-native-vector-icons/MaterialIcons'

class Inbox extends React.Component {
    Title = {
        title: 'Inbox',
        icon: null,
        color: '#EEE2D0'
    }
    state = {
        modalVisible: false,
        inboxes: [
            {
                to:'Mi Movies Admin',
                image: require('../assets/images/user/user1.png'),
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing sed',
                status: 'read',
                new: true
            },
            {
                to:'Mi Movies Admin',
                image: require('../assets/images/user/user1.png'),
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing sed',
                status: 'received'
            },
            {
                to:'John Doe',
                image: require('../assets/images/user/user1.png'),
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing sed',
                status: 'sent'
            },
        ]
    }

    handleOpenMessage = ()=>{
        // Alert.alert('open message')
        this.setModalVisible(true);

    }
    renderInboxes = ($inboxes)=>{
        return(
            <Fragment>
                {$inboxes.map((data,index)=>{
                    return(
                        <TouchableOpacity 
                            onPress={()=>this.handleOpenMessage()}
                            key={index}
                        >
                            <View key={index} style={styles.inboxView}>
                                <View style={styles.imageView}>
                                    <Image 
                                        source={data.image}
                                        style={styles.userImage}
                                    />
                                </View>
                                <View style={styles.inboxContentView}>
                                    <View style={styles.inboxToName}>
                                        <Text style={{
                                            color: '#FFFFFF',
                                            color: '#AAA9A7',
                                            color: data.new?'#FFFFFF':'#AAA9A7',
                                            fontFamily: 'RobotoSlab-Bold',
                                            fontSize: 18
                                        }}>{ data.to }</Text>
                                    </View>
                                    <View style={styles.inboxMessageTxtView}>
                                        <Text style={{
                                            color: '#A2A2A2',
                                            width: 202,
                                            overflow: 'hidden',
                                            fontFamily: 'RobotoSlab'
                                        }}>{data.text}</Text>
                                        {data.status=='sent'?(
                                            <Icon   
                                                name = 'done'                                          
                                                color='gray'
                                                size = {20}
                                                style={styles.tickIcon}
                                            />
                                        ):(
                                            <Fragment>
                                                {data.status=='received'?(
                                                    <Icon   
                                                    name = 'done-all'                                          
                                                    color='gray'
                                                    size = {20}
                                                    style={styles.tickIcon}
                                                    />
                                                ):(
                                                    <Icon   
                                                        name = 'done-all'                                          
                                                        color='green'
                                                        size = {20}
                                                        style={styles.tickIcon}
                                                    />
                                                )}

                                            </Fragment>
                                        )}
                                        
                                    </View>
                                    
                                </View>
                               
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </Fragment>
        )
    }

    // navigateToMovieDetailsPage = ()=>{
    //     // this.props.navigation.navigate('MovieDetailsPage')
    //     this.setModalVisible(true);
    // }

    setModalVisible(visible) {
        // Alert.alert(visible)
        this.setState({...this.state,modalVisible: visible});
      }
 
    render(){
        let { inboxes } = this.state
        return (
            <SafeAreaView style={styles.inbox}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.setModalVisible(false);
                    }}>
                        <OpenInbox  />
                </Modal>
                <MainHeader TITLE={this.Title}/>
                <View style={styles.inboxBody}>
                    <View style={styles.inboxBodyTitleView}>
                        <Text style={styles.inboxBodyTitleText}>Recent Charts</Text>
                    </View>
                    <View style={styles.inboxBodyContentView}>
                        <ScrollView>
                            {this.renderInboxes(inboxes)}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    inbox: {
        flex: 1,
        backgroundColor: '#121212'
    },
    inboxBody: {
        display: 'flex',
        justifyContent: 'center'
    },
    inboxBodyTitleView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    inboxBodyTitleText: {
        color: '#84827F',
        fontFamily: 'RobotoSlab',
        fontSize: 18
    },
    inboxBodyContentView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inboxView: {
        backgroundColor: '#242424',
        width: 303.3,
        height: 78,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 5,
        marginBottom: 5,
        borderRadius: 4
    },
    imageView: {
        width: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImage: {
        // width: 
    },
    inboxContentView: {
        paddingLeft: 5
    },
    inboxMessageTxtView: {
        position: 'relative'
    },
    tickIcon: {
        position: 'absolute',
        right: -18,
        bottom: -20
    }
})


export default Inbox;