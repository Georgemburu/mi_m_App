import { GET_HOME_SLIDER_IMAGES, GET_NEW_MOVIES_DATA } from '../action.types';

let initialState = {
    homeSliderImages: [
        {
            imageUrl: require('../../assets/images/home_slider/1.png'),
            title: 'Dracula',
            id: 1
        },
        {
            imageUrl: require('../../assets/images/home_slider/2.png'),
            title: 'Dracular',
            id: 2
        }
        
    ],
    newMovies: [
        // {
        //     title: '',
        //     id: 1,
        //     image: require('../../assets/images/home_slider/1.png'),
        //     decription
        // },
        // {
        //     title: '',
        //     id: 2,
        //     image: require('../../assets/images/home_slider/2.png')
        // },
        // {
        //     title: '',
        //     id: 1,
        //     image: require('../../assets/images/home_slider/1.png')
        // },
        // {
        //     title: '',
        //     id: 2,
        //     image: require('../../assets/images/home_slider/2.png')
        // }
    ]
}

function homeReducer(state=initialState,action){
    switch(action.type){
        case GET_HOME_SLIDER_IMAGES: 
            return {
                ...state,
                homeSliderImages: [...action.payload]
            };
            break;
        case GET_NEW_MOVIES_DATA: 
            return {
                ...state,
                newMovies: [...action.payload]
            };
            break;
        default: 
            return state;
            break;
    }
}


export default homeReducer;