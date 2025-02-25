import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer'; // Adjust the path as needed

const rootReducer = combineReducers({
    user: userReducer,
    // other reducers if you have
});

const store = createStore(rootReducer);

export default store;
