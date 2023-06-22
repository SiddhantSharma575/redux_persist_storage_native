import { createStore, combineReducers, applyMiddleware } from 'redux';
import countReducer from "../reducers/countReducers";
import createSageMiddleware from "redux-saga"
import mysaga from "../sagas"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer,persistCombineReducers } from 'redux-persist'
export const sagaMiddlewares = createSageMiddleware()
// import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug : true
}

// const rootReducer = combineReducers(
// { count: countReducer }
// );
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const configureStore = () => {
// return createStore(persistedReducer,applyMiddleware(sagaMiddlewares));
// }

// export const persistor = persistStore(configureStore())

const configureStore = createStore(
  persistCombineReducers(persistConfig, {
    count: countReducer
  }),
  applyMiddleware(sagaMiddlewares),
);

export const persistor = persistStore(configureStore);

// return { persistor, store };
// sagaMiddlewares.run(mysaga)
export default configureStore;