import React, { Fragment } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native'

import MainHeader from '../components/dumb/headers/main'
import Icon from 'react-native-vector-icons'

const HEIGHT  = Dimensions.get('window').height


class Cart extends React.Component {
    Title = {
        title: 'Cart',
        icon: 'shopping-cart'
    }
    state = {
        cartContents: [
            {
                title: 'Lord of The Rings',
                price: '50',
                id: 1
            },
            {
                title: 'Lord of The Rings',
                price: '50',
                id: 2
            },
            {
                title: 'Lord of The Rings',
                price: '50',
                id: 3
            }
        ]
    }

    displayCartContents = ($cartContents)=>{

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
                        {$cartContents.map((item)=>{
                            return(
                                <View key={item.id}
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
                                    <TouchableOpacity>
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
    render(){
        let { cartContents } = this.state;
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
                            <Text style={{
                                color:'#FFF8EE',
                                fontSize: 25,
                                fontFamily: 'RobotoSlab',
                                marginRight: 70
                            }}>100</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.sendOrderButtonView}>
                    <TouchableOpacity style={{
                        width: 159,
                        height: 52,
                        backgroundColor: '#605858',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4
                    }}>
                        <Text style={{
                            color: '#FFFFFF',
                            fontFamily: 'RobotoSlab',
                            fontSize: 18
                        }}>Send My Order</Text>
                    </TouchableOpacity>
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

export default Cart;