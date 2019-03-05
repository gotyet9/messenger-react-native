import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage if web, AsyncStorage if react-native
import { createLogger } from 'redux-logger';

import rootReducers from '../reducers'; // where reducers is a object of reducers

const config = {
    key: 'root',
    storage,
    blacklist: ['loadingReducer'],
    debug: true //to get useful logging
};

const middleware = [];

// middleware.push(); push here middlewares such as saga, thunk etc

if (__DEV__) {
    middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const persistConfig = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
    //   console.log('Test', store.getState());
});
const configureStore = () => {
    return { persistor, store };
};

export default configureStore;