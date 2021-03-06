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
    Dimensions,
    Alert,
    TextInput
} from 'react-native';
import { WebView } from 'react-native-webview';

// storage
import asyncStorage from '@react-native-community/async-storage';

// key
import { CART_DATA_STORAGE_KEY } from '../constants/strings';

// store
import { connect } from 'react-redux';
import { ADD_ToCart } from '../store/actions/cartActions';

// shared file
import MOVIE_DATA_FOR_DETAILS_VIEW  from '../sharedFiles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


import MainHeader from '../components/dumb/headers/main'

import Icon from 'react-native-vector-icons/MaterialIcons'

class MovieDetails extends React.Component {
    constructor(props){
        super(props);
        this.Title = {
            title: 'Rick And Show',
            icon: null,
            color: '#EEE2D0',
        }
        this.state = {
            movieDetails: {
                galaryImages: [
                    require('../assets/images/movieGalary/1.png'),
                    require('../assets/images/movieGalary/1.png'),
                    // require('../assets/images/movieGalary/1.png'),
                    // require('../assets/images/movieGalary/1.png'),
                    // require('../assets/images/movieGalary/1.png'),
                    // require('../assets/images/movieGalary/1.png'),
                    // require('../assets/images/movieGalary/1.png'),
                    // require('../assets/images/movieGalary/1.png'),
                    // require('../assets/images/movieGalary/1.png'),
                    // require('../assets/images/movieGalary/1.png'),
    
                ]
            },
            clickedPlay: false
        }
    }
    
    
    navigateToCart = ()=>{
        console.log('NAVIGATING PROPS =>',this.props)
        if(this.props.navigation!==undefined){
            console.log('Not as MODAL')
            this.props.navigation.navigate('CartPage')
        }else {
            // its a modal
            // use passed prop to navigate
            console.log('As Modal')
            this.props.NAVIGATE_TO_CART_FUNCTION()
        }
    }
    displayHeader = ($cartItems)=>{
        return(
            <View style={{
                height: 50,
                backgroundColor: '#313131',
                marginBottom: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 5,
                paddingTop: 5
            }}>
                <View>
                    <View></View>
                </View>
                <View>
                    <Text style={{
                        color: '#EEE2D0',
                        fontFamily: 'RobotoSlab',
                        fontSize: 20
                    }}>{this.Title.title}</Text>
                </View>
                <View>
                    <TouchableOpacity 
                        onPress = {()=>this.navigateToCart()}
                        style={{
                            display: 'flex',
                            flexDirection:'row'
                        }}
                    >
                       
                        <Text style={{
                            color: '#52AC59',
                            fontSize:20
                        }}>Go To Cart</Text>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'black',
                            minWidth: 20,
                            minHeight: 20,
                            borderRadius: 100,
                            marginLeft: 3
                        }}>
                            <Text style={{color: 'white',fontFamily:'RobotoSlab-Bold'}}>{$cartItems.length}</Text>
                        </View>
                    </TouchableOpacity>
                   
                </View>
            </View>
        )
    }

    renderMovieGalaryImages =($galaryImages)=>{
        if(!$galaryImages || $galaryImages===undefined){
            return(
                <Text>No Images</Text>
            )
        }
        let galaryImgsArr = $galaryImages.split(',');

        return(
            <Fragment>
                {galaryImgsArr.map((img,index)=>{
                    return(
                        <TouchableOpacity key={index}>
                            <Image
                                source={{
                                    uri: img
                                }}
                                style={{
                                    width: 62,
                                    height: 57,
                                    marginHorizontal: 5
                                }}
                            />
                        </TouchableOpacity>  
                    )
                })}
            </Fragment>
        )
    }


    handleAddMovieToCart = ($movieDataObj)=>{
        console.log('Adding movie to cart .....')
        let { dispatch } = this.props;
        console.log(dispatch)
        ADD_ToCart(dispatch,$movieDataObj)
        if(this._addToCartButtonRef!==undefined||this._addToCartButtonRef!==null){
            try{
                this._addToCartButtonRef.setNativeProps({style:{backgroundColor: 'purple'}});
            }catch(error){

            }
        }
        if(this._addToCartButtonTextRef!==undefined||this._addToCartButtonRef!==null){
            try{
                this._addToCartButtonTextRef.setNativeProps({text:'Added To Cart'})                
            }catch(error){

            }
        }

        setTimeout(()=>{
            if(this._addToCartButtonTextRef!==undefined||this._addToCartButtonRef!==null){
                try{
                    this._addToCartButtonTextRef.setNativeProps({text:'Add to Cart'})
                              
                }catch(error){
    
                }
            }
            if(this._addToCartButtonRef!==undefined||this._addToCartButtonRef!==null){
                try{
                this._addToCartButtonRef.setNativeProps({style:{backgroundColor: '#52AC59'}});                                
                }catch(error){
    
                }
            }
        },500)
    }

    componentWillUnmount(){
        if(this._addToCartButtonTextRef!==undefined||this._addToCartButtonRef!==null){
            this._addToCartButtonTextRef.setNativeProps({text:'Add to Cart'})
        }
        if(this._addToCartButtonRef!==undefined||this._addToCartButtonRef!==null){
            this._addToCartButtonRef.setNativeProps({style:{backgroundColor: '#52AC59'}});
        }
    }
    render(){
        console.log(' ENTER FROM MOVIE DETAILS RENDER METHOD',this.props);
        console.log('SHARED FILE DATA is',MOVIE_DATA_FOR_DETAILS_VIEW.getMovieData())
        console.log('......Entering MOVIE DATA checks');
    
        let {  SET_MODAL_VISIBLE_FUNCTION, cartItems, NAVIGATE_TO_CART_FUNCTION} = this.props;
        let MOVIE_DATA = null;
        console.log('0. MOVIE DATA =',MOVIE_DATA);
        console.log('1. from props');

        MOVIE_DATA = this.props.MOVIE_DATA;
        console.log('->MOVIE DATA =',MOVIE_DATA);
        if(MOVIE_DATA===null || MOVIE_DATA===undefined){
            console.log('seems MOVIE DATA IS null\n so checking from (SHARED FILES)');
            MOVIE_DATA = MOVIE_DATA_FOR_DETAILS_VIEW.getMovieData();
            console.log('->MOVIE DATA =',MOVIE_DATA);

        }

        if(MOVIE_DATA===null || MOVIE_DATA===undefined){
            console.log('BAAAD*****MOVIE DATA is ended up being null',MOVIE_DATA)
            MOVIE_DATA = {};
            console.log('soo, setting it to an empty object to avoid errors')
        }
        console.log('MOVIE DATA checks **(COMPLETE)')
        console.log('setting up the title from MOVI DATA')
        if(MOVIE_DATA){
            this.Title.title = MOVIE_DATA.title;
            console.log('FROM MOVIE DETAILS',MOVIE_DATA);
        }
        let {galaryImages, imageUrl, trailerUrl, description } = MOVIE_DATA;
      
        let { clickedPlay } = this.state;
        console.log('HERRRR',this.props)
        console.log('EXIT MOVIE DETAILS RENDER METHOD')
        return (
            <SafeAreaView style={{flex:1, backgroundColor:'#121212'}}>
                {/* <MainHeader TITLE={this.Title}/> */}
                {this.displayHeader(cartItems)}
                <ScrollView>
                    <View style={styles.movieDetails}>
                    <View style={styles.trailerView}>
                        <View style={styles.youtubeVideoView}>
                            {clickedPlay===true?(
                                <WebView 
                                    source={{
                                        // html: '<iframe width="500" height="400" src="https://www.youtube.com/embed/4o3NVOQp4jo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                                        // html: '<iframe width="560" height="400" src="https://www.youtube.com/embed/nYTRzYZrcUg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                                        html: trailerUrl
                                    }}
                                    style={{
                                        width: 560,
                                        height: 400,
                                        backgroundColor: '#121212'
                                    }}
                                />
                            ):null}
                            
                        </View>
                        {clickedPlay===false?(
                                <View style={styles.movieImageView}>
                                    <ImageBackground
                                        source={{
                                            uri: imageUrl
                                        }}
                                        style={styles.thumbnail}
                                    >
                                        <TouchableOpacity onPress={()=>this.setState({...this.state,clickedPlay:true})}>
                                            <Icon 
                                                name="play-circle-filled"
                                                size={70}
                                                color={'#F9AA33'}
                                                color={'#52AC59'}
                                            />
                                        </TouchableOpacity>

                                    </ImageBackground>
                                </View>

                        ):(null)}
                        
                    </View>
                    <View style={styles.centerView}>
                        <Text style={{
                            color: '#A6A5A4',
                            fontFamily: 'RobotoSlab',
                            fontSize: 10,
                            marginVertical: 5
                        }}>Trailer</Text>
                    </View>

                    <ScrollView horizontal={true}>
                    <View >
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#2D2A2A',
                            height: 65

                        }}>
                            {this.renderMovieGalaryImages(galaryImages)}
                        </View>
                    </View>
                    </ScrollView>

                    <View style={styles.centerView}>
                        <Text style={{
                            color: '#A6A5A4',
                            fontFamily: 'RobotoSlab',
                            fontSize: 10,
                            marginVertical: 5
                        }}>Description</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#2D2A2A',
                        maxHeight: 111,
                        minHeight: 50,
                        width: 294,
                        borderRadius: 4
                    }}>
                        <ScrollView>
                            <Text style={{
                                color: '#686561',
                                fontFamily: 'RobotoSlab',
                                fontSize: 10,
                                paddingHorizontal: 10
                            }}>
                                {description}
                            </Text>
                        </ScrollView>
                    </View>

                    <View style={{
                        marginTop: 20,
                        marginBottom: 20,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity 
                            onPress = {()=>this.handleAddMovieToCart(MOVIE_DATA)}
                            style={{
                                backgroundColor: '#52AC59',
                                width: 173,
                                height: 40,
                                borderRadius: 20,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            ref = {component => this._addToCartButtonRef = component}

                        >
                            <TextInput 
                                editable ={ false}
                                ref = {component => this._addToCartButtonTextRef = component}
                                style={{
                                    color: '#FFFFFF',
                                    fontFamily: 'RobotoSlab',
                                    fontSize: 20
                                }}
                                value = {'Add to Cart'}
                            />
                            
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    movieDetails: {
        // flex: 1,
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
    },
    trailerView: {
        borderColor: 'gray',
        borderWidth: .5,
        width: 300,
        height: 207,
        position: 'relative'
        // backgroundColor: 'white'
    },
    youtubeVideoView: {
        width: 300,
        height: 207,
        position: 'absolute',
        // backgroundColor: 'green',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    movieImageView: {
        width: 300,
        height: 207,
        position: 'absolute',
        // backgroundColor: 'red',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        
    },
    thumbnail: {
        width: 300,
        height: 207,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .7
    },
    centerView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function mapStateToProps(state){
    let { cartReducer } = state;
    return {
        cartItems: cartReducer.cartItems,
        cartErrors: cartReducer.error
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MovieDetails);
