import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { BRAND_NAME } from '../../../../constants/strings'

function AuthHeader(props){
    return(
        <View style={styles.loginHeader}>
                <Icon name="local-movies" size={40} color="#FFFFFF" style={styles.headerBrandLogo}/>
            <Text style={styles.brandName}>{BRAND_NAME}</Text>
        </View>
    )
}




const styles = StyleSheet.create({
    loginHeader:{
        // height:20,
        display: "flex",
        flexDirection: "row",

    },
    brandName:{
        color: "#A299AC",
        fontSize: 40,
        fontFamily: "ProstoOne"
    },
    headerBrandLogo :{
        marginHorizontal: 17,
        marginVertical: 5
    }
})



export default AuthHeader;