import React, { Fragment } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


function AuthForm(props){
    let { marginVertical, FIELDS, HANDLE_FIELDS_CHANGE_FUNCTION } = props
    const styles = StyleSheet.create({
        authForm: {
            display: "flex",
            alignItems: "center",
            marginTop: 5
        },
        formGroup: {
            borderWidth: 2,
            borderColor:"#3A3A42",
            width: 261,
            height: 51,
            borderRadius: 4,
            display: "flex",
            flexDirection: "row",
            marginVertical: marginVertical?marginVertical:3
    
        },
        txtInput :{
            color: "#827C86",
            fontFamily: "Andada",
            width: 205,
        }
    })

    function constructFields($fieldsObj){
        if ($fieldsObj===undefined) return
        let keys = Object.keys($fieldsObj)
        return(
            <Fragment>
                {keys.map((ky,index)=>{
                    
                    return(
                        <Fragment key={index}>
                            {$fieldsObj[ky].secureText===true?(
                                <View style={styles.formGroup} key={index}>
                                    <Icon name={$fieldsObj[ky].iconName} size={34.9} color="#414042" style={{marginTop:3}}/>
                                    <TextInput 
                                        placeholder={$fieldsObj[ky].placeholderText}
                                        placeholderTextColor="#413F42"
                                        style = {styles.txtInput}
                                        selectionColor={'green'}    
                                        secureTextEntry
                                        value={$fieldsObj[ky].value}
                                        onChangeText={(text)=>HANDLE_FIELDS_CHANGE_FUNCTION(text,ky)}
                                    /> 
                                </View>
                            ):(
                                <View style={styles.formGroup} key={index}>
                                    <Icon name={$fieldsObj[ky].iconName} size={34.9} color="#414042" style={{marginTop:3}}/>
                                    <TextInput 
                                        placeholder={$fieldsObj[ky].placeholderText}
                                        placeholderTextColor="#413F42"
                                        style = {styles.txtInput}
                                        selectionColor={'green'}    
                                        value={$fieldsObj[ky].value}
                                        onChangeText={(text)=>HANDLE_FIELDS_CHANGE_FUNCTION(text,ky)}
                                    /> 
                                   
                                </View>
                            )}
                        </Fragment>
                        
                    )
                    })}
            </Fragment>
        )
        
    }
    return(
        <KeyboardAvoidingView behavior="position" enabled style={{
        }}>
            <View style={styles.authForm}>
                {constructFields(FIELDS)}
            </View>
        </KeyboardAvoidingView>

    )
}



export default AuthForm;

