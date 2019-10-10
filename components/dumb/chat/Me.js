import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';



function Me(props){
    let { MESSAGE_DATA } = props;
    return(
        <View style={styles.msgView}>
            <View style={{
                width: 225,
                paddingLeft: 5
            }}>
                <Text style={{
                    color: '#A2A2A2',
                    fontFamily: 'RobotoSlab',
                    fontSize: 12
                }}>{MESSAGE_DATA.text}</Text>
            </View>
            <View style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 1
            }}>
                <Text style={{
                    color: '#5B5B5B',
                    fontSize: 10
                    }}>{MESSAGE_DATA.time}</Text>
                <Icon
                    name='done'
                    size={20}
                    color='gray'
                    style={{
                        marginLeft: 20,
                        marginTop: 20
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    msgView: {
        width: 280,
        minHeight: 50,
        backgroundColor: '#2E316C',
        marginVertical: 5,
        borderRadius: 5,
        marginLeft: 35,
        display: 'flex',
        flexDirection: 'row',   
        paddingTop: 5,
        paddingBottom: 5
    }
})


export default Me;