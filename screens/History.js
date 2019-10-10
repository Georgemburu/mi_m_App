import React, { Fragment } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import MainHeader from '../components/dumb/headers/main'


class History extends React.Component {
    Title = {
        title: 'History',
        icon: null,
        color: "#EEE2D0"
    }
    state = {
        historyData: 
            {
                Today: [
                    {
                        title: 'The Lord of the Rings',
                        price: '50',
                        date: 'today'
                    },
                    {
                        title: 'The Avengers',
                        price: '50',
                        date: 'today'
                    },
                ],
                Yesterday: [
                    {
                        title: 'The Beauty and THe Beast',
                        price: '50',
                        date: 'today'
                    },
                    {
                        title: 'The Maze Runner',
                        price: '50',
                        date: 'today'
                    },
                ],
                "19/01/2019": [
                    {
                        title: 'The Beauty and THe Beast',
                        price: '50',
                        date: 'today'
                    },
                    {
                        title: 'The Maze Runner',
                        price: '50',
                        date: 'today'
                    },
                ],
                "18/01/2019": [
                    {
                        title: 'The Beauty and THe Beast',
                        price: '50',
                        date: 'today'
                    },
                    {
                        title: 'The Maze Runner',
                        price: '50',
                        date: 'today'
                    },
                ]
            }
        
    }

    handleDeleteHistoryCategory = ()=>{
        Alert.alert('Delete')
    }
    displayHistoryData = ($h_data)=>{
        let keys = Object.keys($h_data)
        return (
            <Fragment>
                {
                    keys.map((dt, index)=>{
                        return(
                            <View key={index} style={styles.historyCategoryView}>
                                <View style={styles.historyCategoryViewTitleView}>
                                    <Text style={styles.historyCategoryViewTitleText}>{dt}</Text>
                                    <TouchableOpacity 
                                        onPress={()=>this.handleDeleteHistoryCategory()}
                                    >
                                        <Icon name="delete-forever" size={20} color='red'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.historyCategoryBodyView}>
                                    <ScrollView style={{flex:1}}>
                                        {$h_data[dt].map((dtt,index)=>(
                                                <View key={index} style={styles.historyDetailsView}>
                                                    <Text style={styles.movieTitleText}>{dtt.title}</Text>
                                                    <Text style={styles.moviePriceText}>{dtt.price}</Text>
                                                </View>
                                            ))}
                                    </ScrollView>
                                </View>
                            </View>
                        )
                    })
                }

            </Fragment>
        )
        
    }

    render(){
        const {  historyData } = this.state
        return (
            <View style={styles.history}>
                <MainHeader TITLE={this.Title}/>

                <View style={styles.historyBody}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.displayHistoryData(historyData)}
                    </ScrollView>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    history: {
        backgroundColor: '#121212',
        flex: 1
    },
    historyBody: {
        paddingHorizontal: 27,
        paddingVertical: 21.8
    },
    historyCategoryView: {
        marginBottom: 3
    },
    historyCategoryViewTitleView: {
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    historyCategoryViewTitleText: {
        color: '#EEE2D0',
        fontSize: 20,
        fontFamily: 'RobotoSlab-Bold',
    },
    historyCategoryBodyView: {
        backgroundColor: '#171717',
        borderColor: '#353232',
        borderWidth: 1,
        minHeight: 100,
        maxHeight: 161,
        // marginLeft: 20
    },
    historyDetailsView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 40,
        justifyContent: 'space-between',
        marginBottom: 3
    },
    movieTitleText: {
        color: '#999999',
        fontFamily: 'RobotoSlab',
        // fontSize: 18
    },
    moviePriceText: {
        color: '#FFF8EE',
        fontSize: 20,
        fontFamily: 'RobotoSlab'
    }
})



export default History;