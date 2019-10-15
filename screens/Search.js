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
    FlatList,
    Modal
} from 'react-native'

// store
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import MovieDetails from './MovieDetails';
import MainHeader from '../components/dumb/headers/main';
import SearchedMovieItem from '../components/dumb/searchedMovieItem';
 
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class Search extends React.Component {
    Title = {
        title: 'Search',
        icon: null,
        color: '#EEE2D0'
    }
    state = {
        _ClikedMovie_Data : {},
        modalVisible: false,
        searchText:'',
        foundMovies:[
            // {
            //     title: 'Hobbs & Shaw',
            //     category: 'Action',
            //     id: '1',
            //     image:require('../assets/images/movies/1.png')
            // },
            // {
            //     title: 'Hobbs & Shaw',
            //     category: 'Action',
            //     id: '2',
            //     image:require('../assets/images/movies/1.png')
            // },
            // {
            //     title: 'Hobbs & Shaw',
            //     category: 'Action',
            //     id: '3',
            //     image:require('../assets/images/movies/1.png')
            // },
            // {
            //     title: 'Hobbs & Shaw',
            //     category: 'Action',
            //     id: '4',
            //     image:require('../assets/images/movies/1.png')
            // },
            // {
            //     title: 'Hobbs & Shaw',
            //     category: 'Action',
            //     id: '5',
            //     image:require('../assets/images/movies/1.png')
            // },
            // {
            //     title: 'Hobbs & Shaw',
            //     category: 'Action',
            //     id: '6',
            //     image:require('../assets/images/movies/1.png')
            // },
            // {
            //     title: 'Hobbs & Shaw',
            //     category: 'Action',
            //     id: '7',
            //     image:require('../assets/images/movies/1.png')
            // },
            // {
            //     title: 'Hobbs & Shaw',
            //     category: 'Action',
            //     id: '8',
            //     image:require('../assets/images/movies/1.png')
            // },
        ]
    }
    
    setModalVisible($clickedmovieData=null,visible) {
        // Alert.alert(visible)
        this.setState({
            ...this.state,
            modalVisible: visible,
            _ClikedMovie_Data: $clickedmovieData?$clickedmovieData:{}
        });
    }
    handleChangeSearchTextInput = ($text)=>{
        this.setState({
            ...this.state,
            searchText: $text
        })
    }
    handleSearchBtnClick = ($moviesArr,$searchText)=>{
        // if(!$searchText|| $searchText==='' || $searchText===' '){
        //     return
        // }
        let lowercaseSearchText = $searchText.toLowerCase()
        console.log('Search button clicked')
        console.log('searching for movie containing',$searchText)
        // loop to find movie
        let matchingMovies = []
        $moviesArr.forEach((mov)=>{
            if(mov.title.toLowerCase().includes(lowercaseSearchText)===true){
                matchingMovies.push(mov)
            }
        })
        this.setState({
            ...this.state,
            foundMovies: [...matchingMovies]
        })
        
    }
    openMovieDetailsModal = ($ClickedmovieData)=>{
        console.log('CLICKED TO OPEN MODAl')
        // this._ClikedMovie_Data = $ClickedmovieData;
        this.setModalVisible($ClickedmovieData,true)
    }
    navigateToCart = ()=>{
        // close modal then navigate
        this.setState({
            ...this.state,
            modalVisible: false
        })
        this.props.navigation.navigate('CartPage')
    }
    render(){
        let {foundMovies, searchText} = this.state
        let { allMovies } = this.props;
        console.log('ALL MOVIES',allMovies)
        return (
           <SafeAreaView style={{flex:1}}>
               <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}>
                        <MovieDetails  MOVIE_DATA={this.state._ClikedMovie_Data} NAVIGATE_TO_CART_FUNCTION={this.navigateToCart}/>
                </Modal>
            <View style={styles.search}>
                <MainHeader TITLE={this.Title} />
                <View style={styles.searchBody}>
                    <View style={styles.searchBodyHeadView}>
                        <TextInput 
                            selectionColor={'white'}
                            placeholder = 'Type Movie Title To Search'
                            placeholderTextColor = '#6C6B69'
                            style={styles.searchTextInput}
                            defaultValue = {searchText}
                            onChangeText = {text => this.handleChangeSearchTextInput(text)}
                        />
                        <TouchableOpacity
                            onPress = {()=>this.handleSearchBtnClick(allMovies,searchText)}
                        >
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
                                    renderItem={({ item }) => <SearchedMovieItem FOUND_MOVIE = {item} OPEN_MOVIE_DETAILS_MODAL_FUNCTION={this.openMovieDetailsModal}/>}
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

function mapStateToProps(state){
    console.log('SEARCH PAGE mapping state to props',state);
    return {
        allMovies:[...state.moviesReducer.movies,...state.seriesReducer.series]
    }
}
function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);