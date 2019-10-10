import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'


function SearchedMovieItem(props){
    // let FOUND_MOVIE = 
    //     {
    //         title: 'Hobbs & Shaw',
    //         category: 'Action',
    //         id: '1',
    //         image:require('../../../assets/images/movies/1.png')
    //     }
    
    let  {FOUND_MOVIE}  = props
    function handleShowMovieDetails(){
        Alert.alert('open movie')
    }
    return(
        <TouchableOpacity onPress={()=>handleShowMovieDetails()}>
        <View style={styles.searchedMovieItem}>
            <Image 
                source={FOUND_MOVIE.image}
                style={styles.image}
            />
            <View>
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: '#9B9B9B',
                        fontFamily: 'RobotoSlab',
                        fontSize: 10
                    }}>{FOUND_MOVIE.title}</Text>
                </View>
                <View>
                    <View style={{
                        display: 'flex',
                        flexDirection:'row',
                        paddingLeft: 10,
                        marginBottom: 5
                    }}>
                        <Text style={{
                            color: '#D0C9BF',
                            fontFamily: 'RobotoSlab',
                            fontSize: 10
                        }}>Category:</Text>
                        <Text style={{
                            color: '#999999',
                            fontSize: 10,
                            marginLeft: 5
                        }}>{FOUND_MOVIE.category}</Text>
                    </View>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    searchedMovieItem: {
        backgroundColor: '#222121',
        borderColor: '#484545',
        borderWidth: 1,
        width: 139,
        height: 144,
        marginHorizontal: 8,
        marginBottom: 10
    },
    image: {
        width: 139,
        height: 105
    }
})


export default SearchedMovieItem;