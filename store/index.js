import { combineReducers } from 'redux';


import { allReducers } from './reducers'

const combinedReducers = combineReducers({
    ...allReducers
})



export default combinedReducers;