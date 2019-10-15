import React, { Fragment } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Alert
} from 'react-native'

// async storage
import asyncStorage from '@react-native-community/async-storage';
// key
import { CART_DATA_STORAGE_KEY } from '../constants/strings';

//store
import { connect } from 'react-redux';
import { GET_AllCartData, REMOVE_AParticularMovieFromCart, SEND_order }  from '../store/actions/cartActions';

import MainHeader from '../components/dumb/headers/main'
import Icon from 'react-native-vector-icons'

const HEIGHT  = Dimensions.get('window').height


class Cart extends React.Component {
    Title = {
        title: 'Cart',
        icon: 'shopping-cart'
    }


    handleDelete = ($item)=>{
        let { dispatch } = this.props;
        let itemId = $item.id || $item.uid;
        let newCartItemsClone = [];
        let deleted = false;
        this.props.cartItems.forEach(($itm)=>{
            if($itm.id===itemId || $itm.uid===itemId && deleted===false){
                // do nothing
                // make sure only one is deleted if many of the same time are present
                deleted = true;
            }else {
                newCartItemsClone.push($itm)
            }
        })
       
        REMOVE_AParticularMovieFromCart(dispatch,$item,newCartItemsClone)
    }

    displayCartContents = ($cartContents)=>{
        console.log('LENGTH OF CART=',$cartContents,$cartContents.length)

        return (
            <Fragment>
                {$cartContents.length<1?(
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        marginTop: 10
                        
                    }}>No Items In Cart</Text>
                ):(
                    <Fragment>
                        {$cartContents.map((item,index)=>{
                            return(
                                <View key={item.id+'_'+index}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 10,
                                        marginBottom: 3
                                    }}
                                    >
                                    <Text style={styles.itemsText}>{ item.title }</Text>
                                    <Text style={styles.itemsPrice}>{ item.price}</Text>
                                    <TouchableOpacity
                                        onPress={(item)=>this.handleDelete(item)}
                                    >
                                        <Image 
                                            source={require('../assets/images/other/delete.png')}
                                        />
                                    </TouchableOpacity>
                                    
                                </View>
                            )
                        })}
                    </Fragment>
                )}
            </Fragment>
        )
    }

    displayTotal = ($items)=>{
        let total = 0;
        $items.map((mov)=>{
            if(mov.price){
                total += Number(mov.price)
            }
        })
        console.log('CART TOTAL==',total)
        return (
            <Text style={{
                color:'#FFF8EE',
                fontSize: 25,
                fontFamily: 'RobotoSlab',
                marginRight: 70
            }}>{total}</Text>
        )
    }

    handleSendOrderBtnClick = ()=>{
        console.log('send order BTN clicked');
        let orders = this.props.cartItems;
        let { dispatch } = this.props;
        // send to db;
        if(orders.length<1){
            return
        }
        SEND_order(dispatch,orders)

    }
    render(){
        // let { cartContents } = this.state;
        let cartContents = this.props.cartItems;
        console.log('CART CONTENTS=',cartContents)
        let { cartItems, cartErrors } = this.props;
        if(cartErrors.type!==null && cartErrors.message!==null){
            Alert.alert(cartErrors.type,cartErrors.message)
        }
        return (
            <View style={styles.cart}>
                <MainHeader TITLE={this.Title} />
                <View style={styles.cartBody}>
                    <View style={styles.cartBodyContent}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10
                        }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <Text style={styles.cartTitle}>Items </Text>
                                <View style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 29.3,
                                    height: 29.3,
                                    backgroundColor: '#463D3D',
                                    borderRadius: 100
                                }}>
                                    <Text style={styles.notifCounter}>{ cartContents.length }</Text>
                                </View>
                            </View>

                            <Text style={[styles.cartTitle,{marginRight: 60}]}>Price</Text>
                        </View>

                        <View style={styles.cartContentView}>
                            <ScrollView>
                                {this.displayCartContents(cartContents)}

                            </ScrollView>
                        </View>
                        
                        <View style={styles.itemsTotalView}>
                            <Text style={{
                                color: '#76659B',
                                fontSize: 24,
                                fontFamily: 'RobotoSlab'
                            }}>Total</Text>

                            {this.displayTotal(cartContents)}
                            
                        </View>
                    </View>
                </View>

                <View style={styles.sendOrderButtonView}>
                    {cartContents.length>0?(
                        <TouchableOpacity 
                        onPress = {()=>this.handleSendOrderBtnClick()}
                        style={{
                            width: 159,
                            height: 52,
                            backgroundColor: '#605858',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4
                        }}
                        >
                            <Text style={{
                                color: '#FFFFFF',
                                fontFamily: 'RobotoSlab',
                                fontSize: 18
                            }}>Send My Order</Text>
                        </TouchableOpacity>
                    ):null}
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cart: {
        backgroundColor: '#121212',
        flex: 1
    },
    cartBody: {
        display: 'flex',
        alignItems: 'center'
    },
    cartTitle: {
        color: '#F9AA33',
        fontSize: 20,
        fontFamily: 'RobotoSlab'
    },
    notifCounter: {
        color: 'white',
        
    },
    cartContentView: {
        width: 293,
        borderColor: '#424242',
        borderWidth: 1,
        minHeight: 69,
        maxHeight: HEIGHT-300,
        overflow: 'hidden'
    },
    itemsText: {
        color: '#999999',
        fontFamily: 'RobotoSlab',
        // fontSize: 18
    },
    itemsPrice: {
        color: '#FFF8EE',
        fontFamily: 'RobotoSlab',
        fontSize: 20
    },
    itemsTotalView: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    sendOrderButtonView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40
    }
})

function mapStateToProps(state){
    console.log('CART.JS STATE to props',state)
    let { cartReducer } = state;
    return {
        cartItems: cartReducer.cartItems!==undefined?cartReducer.cartItems:cartReducer,
        cartErrors: cartReducer.error!==undefined?cartReducer.error:({
            type: null,
            message: null
        })
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);