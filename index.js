/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';
import {applyMiddleware} from "redux"

import configureStore, {sagaMiddlewares} from "./redux/store/configureStore";
import mySaga from './redux/sagas';

const store = configureStore()
sagaMiddlewares.run(mySaga)
const RNRedux = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)



AppRegistry.registerComponent(appName, () => RNRedux);
