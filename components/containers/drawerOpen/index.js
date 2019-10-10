import React, { Fragment } from 'react'
import {
     View,
     Text,
     StyleSheet,
     Image,
     TouchableOpacity,
     Alert,
     Modal
    } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import ContactUs from '../../../screens/modals/ContactUs';
import { SafeAreaView } from 'react-navigation';

class DrawerContentComponent extends React.Component {
    constructor(props){
        super(props);
        console.log(props)
    }
    state = {
        modalVisible: false,
      };
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    handleDisplayContactUsModal = ()=>{
        // Alert.alert('clicked')
        this.setModalVisible(!this.state.modalVisible);
        return 
    }
    displayNavItems = ($navigation)=>{
        let navItems = [
            {
                title: 'Home',
                icon: 'home',
                navigateToPathName: 'HomePage',
                active: $navigation.activeItemKey==='HomePage'?true:false                
            },
            {
                title: 'Inbox',
                navigateToPathName: 'InboxPage',
                icon: 'inbox',
                active: $navigation.activeItemKey==='InboxPage'?true:false
            },
            {
                title: 'Cart',
                navigateToPathName: 'CartPage',
                icon: 'shopping-cart',
                active: $navigation.activeItemKey==='CartPage'?true:false
            },
            {
                title: 'History',
                navigateToPathName: 'HistoryPage',
                icon: 'history',
                active: $navigation.activeItemKey==='HistoryPage'?true:false
            }
        ]
        function handleNavigation($path){
            // Alert.alert($path)
            // console.log('NAVIGATION HERRE=?',$navigation.navigation.navigate($path))
            // $navigation.navigate($path)
            $navigation.navigation.navigate($path)
        }
        return (
            <Fragment>
                <Modal 
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                        <SafeAreaView style={{flex:1}}>
                            <ContactUs />
                        </SafeAreaView>
                 </Modal>
                 
                {navItems.map((item, index)=>{
                    return (
                        <Fragment key={index}>
                        {item.active===true?(
                               <TouchableOpacity 
                                    key={index}
                                    style={styles.navItem}
                                    onPress={()=>handleNavigation(item.navigateToPathName)}
                                    >
                               <Icon 
                                   name={item.icon}
                                   size={30}
                                   color="#F9AA33"
                                   style={{
                                       marginRight: 10,
                                       // marginTop: 1
                                   }}
                               />
                               <Text style={[styles.navText,styles.activeNav]}>{ item.title }</Text>
                           </TouchableOpacity> 
                        ):(

                        
                            <TouchableOpacity 
                                    key={index}
                                    style={styles.navItem}
                                    onPress={()=>handleNavigation(item.navigateToPathName)}                                    
                                    >
                                <Icon 
                                    name={item.icon}
                                    size={30}
                                    color="#EEE2D0"
                                    style={{
                                        marginRight: 10,
                                        // marginTop: 1
                                    }}
                                />
                                <Text style={styles.navText}>{ item.title }</Text>
                            </TouchableOpacity>
                        )}
                        </Fragment>

                    )
                })}
            </Fragment>
            
        )
    }

    render(){
        console.log('FROM DRAWER COMPONENT=>',this.props)
        let { navigation } = this.props;
        return(
            <View style={styles.drawerContentComponent}>
                <View style={styles.header}>
                    <View style={styles.userPicView}>
                        <Image 
                            source={require('../../../assets/images/user/user1.png')}
                        />
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.bodyTopContent}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: 10,
                            paddingHorizontal: 10
                        }}>
                            {/* <Icon 
                                name="account-circle"
                                size = {30}
                                color="#EEE2D0"
                            /> */}
                            <TouchableOpacity 
                                onPress={()=>navigation.navigation.navigate('ProfilePage')}
                                // style={{

                                // }}
                            >
                                <Text style={styles.navText}>Profile</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={()=>navigation.navigation.navigate('SearchPage')}
                            >
                                <Image 
                                source={require('../../../assets/images/drawerIcons/search.png')}
                            />
                            </TouchableOpacity>
                            
                        </View>
                    </View>

                    <View style={styles.navItemsView}>
                        {this.displayNavItems(navigation)}
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.footerContentView} onPress={()=>this.handleDisplayContactUsModal()}>
                            <Image 
                                source={require('../../../assets/images/drawerIcons/chat.png')}
                                style={{
                                    marginRight: 10
                                }}
                            />
                            <Text style={styles.navText}>Contact Us</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    drawerContentComponent: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#33414B',

    },
    header: {
        backgroundColor: '#484848',
        height: 181,
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    body: {
        flex: 1,
        position: 'relative'
    },
    userPicView: {
        backgroundColor: '#EBEBEB',
        width: 97,
        height: 97,
        borderRadius: 100,
        position: 'absolute',
        marginTop: 130,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyTopContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 4
    },
    navText: {
        color: '#EEE2D0',
        fontFamily: 'RobotoSlab-Bold',
        fontSize: 20,
        fontWeight: '900',
    },
    navItemsView: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    navItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(65,79,89,.4)',
        width: 250,
        borderRadius: 25,
        marginBottom: 10,
        paddingLeft: 10
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 5,
        paddingLeft: 20
    },
    footerContentView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    activeNav: {
        color: '#F9AA33'
    }
})


export default DrawerContentComponent;