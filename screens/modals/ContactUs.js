import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'

function ContactUs(props){

    return(
        <View style={styles.contactUs}>
            <TouchableOpacity >
                <View style={[styles.btn, styles.callBtn]}>
                    <Icon 
                        name='phone'
                        size={23.9}
                        color='#F9AA33'
                        style={styles.iconn}
                    />
                    <View style={styles.textView}>
                        <Text style={{
                            color: '#F9AA33',
                            fontFamily: 'RobotoSlab',
                            fontSize: 20
                        }}>+254702755733</Text>
                    </View>              
                </View>
            </TouchableOpacity>

            <TouchableOpacity >
                <View style={[styles.btn, styles.emailBtn]}>
                    <Icon 
                        name='email'
                        size={23.9}
                        color='#F9AA33'
                        style={styles.iconn}
                    />
                    <View style={styles.textView}>
                        <Text style={{
                            color: '#999897',
                            fontFamily: 'RobotoSlab',
                            fontSize: 20
                        }}>mimovies@admin.com</Text>
                    </View>              
                </View>
            </TouchableOpacity>

            <TouchableOpacity >
                <View style={[styles.btn, styles.messageBtn]}>
                    <Icon 
                        name='forum'
                        size={23.9}
                        color='#F9AA33'
                        style={styles.iconn}
                    />
                    <View style={styles.textView}>
                        <Text style={{
                            color: '#FFFEFD',
                            fontFamily: 'RobotoSlab',
                            fontSize: 20
                        }}>message us</Text>
                    </View>              
                </View>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    contactUs: {
        flex: 1,
        backgroundColor: '#121212',
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 20
    },
    btn :{
        width: 274,
        height: 48,
        borderRadius: 11,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 50
    },
    callBtn: {
        borderColor: '#DDD6D6',
        borderWidth: 1
    },
    textView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconn: {
        marginTop: 5
    },

    emailBtn: {
        backgroundColor: '#3D2BB3'
    },

    messageBtn: {
        backgroundColor:'#52AC59'
    }

})


export default ContactUs;