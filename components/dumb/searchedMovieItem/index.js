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
    
    let  {FOUND_MOVIE, OPEN_MOVIE_DETAILS_MODAL_FUNCTION}  = props
    function handleShowMovieDetails($OPEN_MOVIE_DETAILS_MODAL_FUNCTION){
        $OPEN_MOVIE_DETAILS_MODAL_FUNCTION()
    }
    return(
        <TouchableOpacity onPress={()=>OPEN_MOVIE_DETAILS_MODAL_FUNCTION(FOUND_MOVIE)}>
        <View style={styles.searchedMovieItem}>
            <Image 
                source={{
                    uri: FOUND_MOVIE.imageUrl
                }}
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
                        flexDirection:'column',
                        paddingLeft: 10,
                        marginBottom: 5
                    }}>
                        <View style={styles.detailsViewItem}>
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
                        <View style={styles.detailsViewItem}>
                            <Text style={{
                                color: '#D0C9BF',
                                fontFamily: 'RobotoSlab',
                                fontSize: 10
                            }}>Type:</Text>
                            <Text style={{
                                color: '#999999',
                                fontSize: 10,
                                marginLeft: 5
                            }}>{FOUND_MOVIE.type}</Text>
                        </View>
                        
                        
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
        height: 150,
        marginHorizontal: 8,
        marginBottom: 10
    },
    image: {
        width: 139,
        height: 105
    },
    detailsViewItem: {
        display: 'flex',
        flexDirection:'row'
    }
})


export default SearchedMovieItem;