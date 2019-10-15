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

// store
import { connect } from 'react-redux'
import { GET_orderHistoryData } from '../store/actions/historyActions';


import MainHeader from '../components/dumb/headers/main'


class History extends React.Component {
    Title = {
        title: 'History',
        icon: null,
        color: "#EEE2D0"
    }
    

    componentDidMount(){
        // fetch for history data;
        let { dispatch } = this.props;
        GET_orderHistoryData(dispatch)
    }

    handleDeleteHistoryCategory = ()=>{
        Alert.alert('Delete')
    }
    displayHistoryData = (DatakeysArr,newCorrectedData)=>{
        return (
            <Fragment>
                {
                    DatakeysArr.map((dt, index)=>{
                        return(
                            <View key={index} style={styles.historyCategoryView}>
                                <View style={styles.historyCategoryViewTitleView}>
                                    <Text style={styles.historyCategoryViewTitleText}>{new Date(Number(dt)).toDateString()}</Text>
                                    <TouchableOpacity 
                                        onPress={()=>this.handleDeleteHistoryCategory()}
                                    >
                                        <Icon name="delete-forever" size={20} color='red'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.historyCategoryBodyView}>
                                    <ScrollView style={{flex:1}}>
                                        {newCorrectedData[dt].map((dtt,index)=>(
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

    formatHistoryData = ($data)=>{
        // orderByDATE
        let newDataArr = [];
        /**
         * obj format
         * {
         *  Today: ['data obj'],
         * 
         * }
         * 
         * Year Month Day Time>
         */
        let newDataObj = {};
        let keys = []
        $data.forEach((dt)=>{
            let time = dt.id;
           
            let dateTime = String(time)
            console.log(dateTime,time)
            if(keys.includes(dateTime)===false){
                keys.push(dateTime);
            }
            if(newDataObj[dateTime]===undefined){
                newDataObj[dateTime] = []
            }
            newDataObj[dateTime] = [...dt.orders]
            
        })
        return {
            DatakeysArr: keys,
            newCorrectedData: newDataObj
        }
    }
    render(){
        let { historyData, historyError } = this.props;
        let DatakeysArr = [];
        let newCorrectedData = {};
        if(historyData.length>0){
            let returnedData= this.formatHistoryData(historyData);
            console.log('RETURNED',returnedData)
            DatakeysArr = returnedData.DatakeysArr;
            newCorrectedData = returnedData.newCorrectedData;
        }
        return (
            <View style={styles.history}>
                <MainHeader TITLE={this.Title}/>

                <View style={styles.historyBody}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.displayHistoryData(DatakeysArr, newCorrectedData )}
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


function mapStateToProps(state){
    console.log('HISTORY PAGE mapping state to props',state)
    let { historyReducer } = state;
    return {
        historyData: historyReducer.orderHistoryData,
        historyError: historyReducer.error
    }
}

function mapStateToDispatch(dispatch){
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps,mapStateToDispatch)(History);