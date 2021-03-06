import React, { Fragment } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
    Modal,
    Alert
} from 'react-native'

// store
import { connect } from 'react-redux';


import MainHeader from '../components/dumb/headers/main'
import MovieDetails from './MovieDetails'
import seriesReducer from '../store/reducers/seriesReducer';

const WIDTH = Dimensions.get('window').width
class CategoryMoviesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            Title :{
                title: 'Comedy Movies',
                icon: null,
                color: '#EEE2D0'
            }
        }
        this._ClikedMovie_Data = null;
    }
    
    componentDidMount(){
        let categoryTitle = this.props.navigation.getParam('categoryTitle',null)
        console.log('FROM CATEGORY MOVIES LIST',categoryTitle)
        
    }
    
    

  
   
    navigateToMovieDetailsPage = ($MovieData)=>{
        // this.props.navigation.navigate('MovieDetailsPage')
        this._ClikedMovie_Data = $MovieData;
        this.setModalVisible(true);
    }

    setModalVisible(visible) {
        // Alert.alert(visible)
        this.setState({...this.state,modalVisible: visible});
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
        let { movies, series } = this.props;
        let { Title } = this.state;
        console.log('FROM CATEGORY MOVIES LIST (navigation)',this.props.navigation)
        let categoryTitle = this.props.navigation.getParam('categoryTitle',null);
        let splitedCategoryTiTle = categoryTitle?categoryTitle.split(' '):[];
        let movieCategory = splitedCategoryTiTle[0];
        let movieType = splitedCategoryTiTle[1];
        // if(splitedCategoryTiTle){
            // title=splitedCategoryTiTle[0];
            // category = splitedCategoryTiTle[1];
        // }
        let sortedOutMoviesArr = [];
        this.state.Title.title = `${categoryTitle}`;
        if(movieType.toLowerCase()=='movies'){
            movies.forEach((mov)=>{
                console.log('looping through MOVIES',mov)
                if(mov.category&&mov.category.toLowerCase()===movieCategory.toLowerCase()){
                    sortedOutMoviesArr.push(mov)
                }
            })
        }else {
            series.forEach((mov)=>{
                console.log('looping through SERIES',mov)

                if(mov.category&&mov.category.toLowerCase()===movieCategory.toLowerCase()){
                    sortedOutMoviesArr.push(mov)
                }
            })
        }
        

        return (
            <SafeAreaView style={{flex:1, backgroundColor:'#121212'}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}>
                        <MovieDetails  MOVIE_DATA={this._ClikedMovie_Data} NAVIGATE_TO_CART_FUNCTION={this.navigateToCart}/>
                    </Modal>
                <MainHeader TITLE={Title}/>
                <ScrollView>
                <View style={styles.categoryMoviesList}>  
                    {sortedOutMoviesArr.map((movie,index)=>{
                        return(
                            <TouchableOpacity 
                                onPress={()=>this.navigateToMovieDetailsPage(movie)}
                                key = {index}
                            > 
                            <View key={index} style={styles.movieView}>
                                <Image 
                                    source={movie.image||movie.imageUrl&&movie.image.startsWith('http')||movie.imageUrl.startsWith('http')?(
                                        {
                                            uri: movie.image||movie.imageUrl
                                        }
                                    ):(
                                        null
                                    )}
                                    style={{
                                        width: 111.9,
                                        height: 95
                                    }}
                                />
                                <View style={styles.centerContentView}>
                                    <Text 
                                        style={{
                                            color: '#9B968E',
                                            fontFamily: 'RobotoSlab'
                                        }}
                                    >{movie.title}</Text>
                                </View>
                                
                            </View>
                            </TouchableOpacity>
                        )
                    })}

                </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    categoryMoviesList: {
       display: 'flex',
       alignItems: 'center',
       flex: 1,
       flexDirection:'row',
       width:WIDTH,
       flexWrap: 'wrap',
       paddingHorizontal: 25,
    
    },
    movieView: {
        width: 111.9,
        height: 121,
        borderColor: 'gray',
        borderBottomWidth: .4,
        borderBottomColor: 'white',
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        shadowColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 5
    },
    centerContentView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function mapStateToProps(state){
    console.log('from CATEGORY MOVIES LIST map state to Props',state)
    let { moviesReducer, seriesReducer } = state;
    return {
        movies: moviesReducer.movies,
        series: seriesReducer.series
    }
}
function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryMoviesList);