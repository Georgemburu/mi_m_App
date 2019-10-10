import React, { Fragment } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import MainHeader from '../components/dumb/headers/main'
import SearchedMovieItem from '../components/dumb/searchedMovieItem'
 
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class Search extends React.Component {
    Title = {
        title: 'Search',
        icon: null,
        color: '#EEE2D0'
    }
    state = {
        
        foundMovies:[
            {
                title: 'Hobbs & Shaw',
                category: 'Action',
                id: '1',
                image:require('../assets/images/movies/1.png')
            },
            {
                title: 'Hobbs & Shaw',
                category: 'Action',
                id: '2',
                image:require('../assets/images/movies/1.png')
            },
            {
                title: 'Hobbs & Shaw',
                category: 'Action',
                id: '3',
                image:require('../assets/images/movies/1.png')
            },
            {
                title: 'Hobbs & Shaw',
                category: 'Action',
                id: '4',
                image:require('../assets/images/movies/1.png')
            },
            {
                title: 'Hobbs & Shaw',
                category: 'Action',
                id: '5',
                image:require('../assets/images/movies/1.png')
            },
            {
                title: 'Hobbs & Shaw',
                category: 'Action',
                id: '6',
                image:require('../assets/images/movies/1.png')
            },
            {
                title: 'Hobbs & Shaw',
                category: 'Action',
                id: '7',
                image:require('../assets/images/movies/1.png')
            },
            {
                title: 'Hobbs & Shaw',
                category: 'Action',
                id: '8',
                image:require('../assets/images/movies/1.png')
            },
        ]
    }
    render(){
        let {foundMovies} = this.state
        return (
           <SafeAreaView style={{flex:1}}>
            <View style={styles.search}>
                <MainHeader TITLE={this.Title} />
                <View style={styles.searchBody}>
                    <View style={styles.searchBodyHeadView}>
                        <TextInput 
                            selectionColor={'white'}
                            placeholder = 'Type Movie Title To Search'
                            placeholderTextColor = '#6C6B69'
                            style={styles.searchTextInput}
                        />
                        <TouchableOpacity>
                            <Text style={{
                                color: '#F9AA33',
                                fontFamily: 'RobotoSlab',
                                fontSize: 20
                            }}>Search</Text>
                        </TouchableOpacity>
                        
                    </View>
                
                    <View style={styles.searchResultsView}>
                        <View style={styles.searchResultsHeaderView}>
                            <Text style={{
                                color: '#99948D',
                                fontFamily: 'RobotoSlab',
                                fontSize: 14
                            }}>Results</Text>
                        </View>

        
                        <View style={styles.searchResultsContentsView}>
                               
                                <FlatList horizontal
                                    data={foundMovies}
                                    renderItem={({ item }) => <SearchedMovieItem FOUND_MOVIE = {item} />}
                                    keyExtractor={item => item.id}
                                />
                        </View>

                       
                        

                    </View>
                </View>
            </View>
           </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    search: {
        flex: 1,
        backgroundColor: '#121212'
    },
    searchBody: {

    },
    searchBodyHeadView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchTextInput: {
        color: 'white',
        backgroundColor:'#424242',
        width: 200,
        height: 40,
        borderRadius: 10,
        marginRight: 15,
        fontSize: 13
    },
    searchResultsView: {
        paddingTop: 10
    },
    searchResultsHeaderView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchResultsContentsView: {
        display: 'flex',
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: WIDTH,
        marginTop: 30
        // height: HEIGHT-150
    },
    scrollV: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    }
})

export default Search;