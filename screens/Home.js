import React, { Fragment } from 'react';
import { BRAND_NAME } from '../constants/strings'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    Alert,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


// store
import { connect } from 'react-redux';

// actions
import {GET_SharedData, SET_SharedData } from '../store/actions/sharedDataActions';
import {ACTIVATE_Chat_Listener, SET_ChatMesssages } from '../store/actions/chatActions';


// shared files
import  MOVIE_DATA_FOR_DETAILS_VIEW from '../sharedFiles';


const WIDTH = Dimensions.get('window').width

import MainHeader from '../components/dumb/headers/main'
// import { TouchableOpacity } from 'react-native-gesture-handler';

class Home extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home'
    }
    Title = {
        title: BRAND_NAME,
        icon: null,
        color: '#EEE2D0',
    }
    state = {
        MovieCategoriesArr: [
            {
                title: 'Action',
                icon: require('../assets/images/categoryIcons/gun.png')
            },
            {
                title: 'Comedy',
                icon: require('../assets/images/categoryIcons/comedy.png')
            },
            {
                title: 'Drama',
                icon: require('../assets/images/categoryIcons/drama.png')
            },
            {
                title: 'Thriller',
                icon: require('../assets/images/categoryIcons/thriller.png')
            },
            {
                title: 'Horror',
                icon: require('../assets/images/categoryIcons/horror.png')
            },
            {
                title: 'Animation',
                icon: require('../assets/images/categoryIcons/cartoon.png')
            },
            {
                title: 'Scify',
                icon: require('../assets/images/categoryIcons/sciFy.png')
            },
            {
                title: 'All',
                icon: require('../assets/images/categoryIcons/all.png')
            }
        ],
        SeriesCategoriesArr:[
            {
                title: 'Action',
                icon: require('../assets/images/categoryIcons/gun.png')
            },
            {
                title: 'Comedy',
                icon: require('../assets/images/categoryIcons/comedy.png')
            },
            {
                title: 'Drama',
                icon: require('../assets/images/categoryIcons/drama.png')
            },
            {
                title: 'Thriller',
                icon: require('../assets/images/categoryIcons/thriller.png')
            },
            {
                title: 'Horror',
                icon: require('../assets/images/categoryIcons/horror.png')
            },
            {
                title: 'Cartoon',
                icon: require('../assets/images/categoryIcons/cartoon.png')
            },
            {
                title: 'Documentary',
                icon: require('../assets/images/categoryIcons/documentary.png')
            },
            {
                title: 'Reality_Shows',
                icon: require('../assets/images/categoryIcons/reality_shows.png')
            },
            {
                title: 'SciFy',
                icon: require('../assets/images/categoryIcons/sciFy.png')
            },
            {
                title: 'All',
                icon: require('../assets/images/categoryIcons/all.png')
            }
        ],
    }

    componentDidMount(){
        // fetch homeImageSliders
      

        // fetch newMovies  
        // activate chat listener for schats
        let { dispatch } = this.props;
        this._unsubscribeChatListener = ACTIVATE_Chat_Listener(dispatch,($chatMsgArr)=>{
            // dispatch chatmessages 
            SET_ChatMesssages(dispatch,$chatMsgArr)
        })  
    }

    renderHomeSliderImages = ($imageArr)=>{
        return (
            <Fragment>
               { 
                    $imageArr.map((imgObj,index)=>{
                        console.log(imgObj)
                        return(
                            <Image 
                                key={imgObj.id}
                                source = {String(imgObj.imageUrl).startsWith('http')?({uri:imgObj.imageUrl}):(imgObj.imageUrl)}
                                style={styles.homeSliderImage}
                            />
                        )
                    })
                }
            </Fragment>
        )
        
    }
    // MOVIE_DATA
    renderHomeNewMoviesSliderImages = ($newMoviesArr)=>{
        return (
            <Fragment>
                {
                    $newMoviesArr.map(($movieObj,index)=>{
                        return(
                            <TouchableOpacity
                                onPress={()=>this.navigateToMovieDetailsPage($movieObj)}
                                key={index}
                            >
                                <Image 
                                    key={index}
                                    source = {$movieObj.imageUrl&&$movieObj.imageUrl.startsWith('http')?({uri:$movieObj.imageUrl}):null||$movieObj.imageUrl }
                                    resizeMode = 'contain'
                                    style={styles.newMoviesImage}
                                />
                            </TouchableOpacity>
                            
                        )
                    })
                }
            </Fragment>
        )
    }
    navigateToMovieCategoriesListing = ($categoryTitle)=>{
        console.log('NAVIGATING to Movie Listing('+$categoryTitle+')')
        this.props.navigation.navigate('MovieCategoryListingPage',{categoryTitle:$categoryTitle})
    }
    navigateToMovieDetailsPage = ($movieObj)=>{
        console.log('Navigating thes movie to MOVIE DETIALS PAGE',$movieObj);
        // SET_SharedData(this.props.dispatch,{'movieData':$movieObj},()=>{
        // })
        MOVIE_DATA_FOR_DETAILS_VIEW.setMovieData($movieObj) 
        // this.props.navigation.navigate('MovieDetailsPage',{'movieData':{...$movieObj}})
        this.props.navigation.navigate('MovieDetailsPage')

        
    }
    renderMovieCategories = ($categoryArr)=>{
        let counter;
        return (
            <Fragment>
                {$categoryArr.map((category,index)=>{
                    return(
                        <Fragment key={index} >
                            <TouchableOpacity 
                                onPress={(e)=>this.navigateToMovieCategoriesListing(category.title+' Movies')}
                                key={index} 
                                style={[styles.movieCategoryItem,styles[(index%2==0?'evenColor':'oddColor')]]}
                                >
                                    <View key={index} style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Image 
                                            source={category.icon}
                                            // size={50.4}
                                            // color="#918686"
                                            style={styles.categoryIcon}
                                        />
                                    </View>
                                    <View style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={styles.categoryTitleText}>{category.title.toLowerCase().includes('all')===true?category.title+' Movies':category.title}</Text>
                                    </View>
                            </TouchableOpacity>
                        </Fragment>
                    )
                })}
            </Fragment>
        )
    }

    renderSeriesCategories = ($categoryArr)=>{
        let counter;
        return (
            <Fragment>
                {$categoryArr.map((category,index)=>{
                    return(
                        <Fragment key={index} >
                            <TouchableOpacity 
                                onPress={(e)=>this.navigateToMovieCategoriesListing(category.title+' Series')}
                                key={index} 
                                style={[styles.movieCategoryItem,styles[(index%2==0?'seriesEvenColor':'seriesOddColor')]]}
                                >
                                    <View key={index} style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Image 
                                            source={category.icon}
                                            // size={50.4}
                                            // color="#918686"
                                            style={styles.categoryIcon}
                                        />
                                    </View>
                                    <View style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={styles.categoryTitleText}>{category.title.toLowerCase().includes('all')===true?category.title+' Series':category.title}</Text>
                                    </View>
                            </TouchableOpacity>
                        </Fragment>
                    )
                })}
            </Fragment>
        )
    }

    componentWillUnmount(){
        this._unsubscribeChatListener()
    }
    render(){
        let { MovieCategoriesArr, SeriesCategoriesArr } = this.state;
        let { homeSliderImages, newMovies } = this.props;

        return(
            <SafeAreaView style={{flex:1}}>
                <View style={styles.home}>
                    <MainHeader TITLE={this.Title}/>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator = {false}
                        centerContent = {true}
                        style={{width: WIDTH}}
                    >
                        <View style={styles.homeSliderView}>
                            <ScrollView
                                horizontal
                                snapToAlignment= 'start'
                                pagingEnabled = {true}
                            >
                                {this.renderHomeSliderImages(homeSliderImages)}
                            </ScrollView>
                        </View>

                        <View style={styles.newMoviesSliderView}>
                            <View style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: WIDTH
                            }}>
                                <Text style={styles.titles}>New Movies</Text>

                            </View>
                            <ScrollView
                                horizontal
                            
                            >
                                {this.renderHomeNewMoviesSliderImages(newMovies)}
                            </ScrollView>
                        </View>

                        <View>
                            <View style={{
                                    display: 'flex',
                                    // flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: WIDTH,
                                    marginVertical: 5
                                
                                }}>
                                    <Text style={styles.titles}>Movie Categories</Text>

                            </View>
                            <View style={styles.movieCategoriesView}>
                                {this.renderMovieCategories(MovieCategoriesArr)}
                            </View>

                        </View>

                        {/* added for series */}
                        <View>
                            <View style={{
                                    display: 'flex',
                                    // flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: WIDTH,
                                    marginVertical: 5
                                
                                }}>
                                    <Text style={styles.titles}>Series Categories</Text>

                            </View>
                            <View style={styles.movieCategoriesView}>
                                {this.renderSeriesCategories(SeriesCategoriesArr)}
                            </View>

                        </View>

                        {/* end for series */}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: "#121212",
        display: 'flex',
        flex: 1,
        alignItems: 'center'

    },
    homeSliderView: {
        width: 300.5,
        height: 183,
        justifyContent: "center",
        marginHorizontal: 10
    },
    homeSliderImage :{
        width: 300.5,
        height: 183
    },
    titles: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Andika',
        width: 200,
        textAlign: 'center'
    },
    newMoviesImage: {
        width: 154,
        marginRight: 10,
        height: 100
    },
    newMoviesSliderView :{
        width: WIDTH-10,
        textAlign: 'center',
        height: 130
    },
    movieCategoriesView: {
        display: 'flex',
        flexDirection: 'row',
        width: WIDTH,
        paddingLeft: 24.3,
        paddingRight: 24.3,
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    movieCategoryItem: {
        width: 122.3,
        height: 113,
        borderRadius: 5,
        marginBottom: 40
    },
    categoryTitleText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Andika'
    },
    evenColor: {
        backgroundColor: 'rgba(160,32,76,.5)'
        
    },
    oddColor: {
        backgroundColor: '#23103A'
    },
    categoryIcon: {
        marginTop: 10,
        marginBottom: 10
    },
    seriesEvenColor: {
        backgroundColor: 'rgba(89, 112, 108,.5)'
    },
    seriesOddColor: {
        backgroundColor: 'rgba(89, 112, 108,.5)'
    }
    
})

// store
function mapStateToProps(state){
    let { homeReducer } = state;
    console.log('HOME STATE TO PROPS',state)
    return {
        homeSliderImages: homeReducer.homeSliderImages,
        newMovies: homeReducer.newMovies,
        movieData: state.sharedDataReducer.movieData,
        chatMessages: state.chatReducer.messages
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);