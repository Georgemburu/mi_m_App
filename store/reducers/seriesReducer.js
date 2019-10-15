import  { GET_ALL_SERIES_DATA } from '../action.types';

let initialState = {
    series: [
        {
            image: require('../../assets/images/movieListing/1.png'),
            title: 'The Avangers',
            id: 1
        },
        {
            image: require('../../assets/images/movieListing/1.png'),
            title: 'The Avangers',
            id: 2
        },
        {
            image: require('../../assets/images/movieListing/1.png'),
            title: 'The Avangers',
            id: 3
        },
        {
            image: require('../../assets/images/movieListing/1.png'),
            title: 'The Avangers',
            id: 4
        },
        {
            image: require('../../assets/images/movieListing/1.png'),
            title: 'The Avangers',
            id: 5
        },
        {
            image: require('../../assets/images/movieListing/1.png'),
            title: 'The Avangers',
            id: 6
        },
        {
            image: require('../../assets/images/movieListing/1.png'),
            title: 'The Avangers',
            id: 7
        },
    ]
}


function seriesReducer(state=initialState,action){
    switch(action.type){
        case GET_ALL_SERIES_DATA:
                return {
                    ...state,
                    series: [...action.payload]
                }
                break;
        default:
            return state;
            break;
    }
}


export default seriesReducer;