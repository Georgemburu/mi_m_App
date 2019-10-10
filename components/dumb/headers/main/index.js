import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'

const WIDTH = Dimensions.get('window').width

import  { BRAND_NAME } from '../../../../constants/strings'

function MainHeader(props){
    console.log('FROM HEADER',props.TITLE)
    let { TITLE } = props;

    function displayHeaderTitle($title){
        if($title=='HomePage'|| !$title){
            return (
                <Text style={{
                    color: "#A299AC",
                    fontFamily: "ProstoOne",
                    fontSize: 20
                }}>{ BRAND_NAME }</Text> 
            )
        }else {
            return (

               <View style={{
                   display: 'flex',
                   flexDirection: 'row',
                   alignItems: 'center',
                   justifyContent: 'center'
               }}>
                   <Icon 
                    name={$title.icon}
                    color = 'white'
                    size={30}
                    style={{
                        marginTop: 10,
                        marginRight: 3
                    }}
                   />
                   <Text style={{
                    color: $title.color?$title.color:"#A299AC",
                    fontFamily: "ProstoOne",
                    fontSize: 20
                }}>{ $title.title }</Text> 
               </View>


            )

            
        }
        
    }
    return(
        <View style={styles.mainAppHeader}>
            <TouchableOpacity 
                onPress={()=>props.navigation.openDrawer()}
                style={{
                }}
            >
                <Icon 
                    name="menu"
                    size={50}
                    color= "#9B9B9B"
                /> 
            </TouchableOpacity>
            <View style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: 'center'
            }}>
                {displayHeaderTitle(TITLE)}        
                
            </View>
            <View>
                
                <Icon 
                    name="local-movies"
                    size={50}
                    color= "#9B9B9B"         
                />
            </View>
                 
        </View>
    )
}

const styles = StyleSheet.create({
    mainAppHeader: {
        backgroundColor:"#313131",
        width: WIDTH,
        height: 49,
        marginBottom: 10,
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: "row"
    }
})

export default withNavigation(MainHeader);