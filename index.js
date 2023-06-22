/**
 * @format
 */

import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';
import {applyMiddleware} from "redux"

import configureStore, {sagaMiddlewares, persistor} from "./redux/store/configureStore";
import mySaga from './redux/sagas';
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-async-storage/async-storage';


// const store = configureStore()
sagaMiddlewares.run(mySaga)
const RNRedux = () => {
  return (  <Provider store = { configureStore }>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor} >
        <App />
    </PersistGate>
    </Provider>
   )
}



AppRegistry.registerComponent(appName, () => RNRedux);
