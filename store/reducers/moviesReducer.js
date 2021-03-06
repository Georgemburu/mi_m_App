import { GET_ALL_MOVIES_DATA } from '../action.types';

let initialState = {
    movies: [
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

function moviesReducer(state=initialState,action){
    switch(action.type){
        case GET_ALL_MOVIES_DATA:
            return {
                ...state,
                movies: [...action.payload]
            }
            break;
        default: 
            return state;
            break
    }
}


export default moviesReducer;