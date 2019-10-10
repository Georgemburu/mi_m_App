import React from 'react'
import  {
    View,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


function AuthUserDefaultImage(props){
    return (
        <View style={styles.authUserDefaultImage}>
            <Icon name="perm-identity" size={50} style={{marginLeft: 4}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    authUserDefaultImage: {
        width: 56,
        height: 56,
        backgroundColor: "#222222",
        borderRadius: 5,
        marginHorizontal: 130,
        marginTop: 20
    }
})
export default AuthUserDefaultImage;