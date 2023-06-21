import { createStore, combineReducers, applyMiddleware } from 'redux';
import countReducer from "../reducers/countReducers";
import createSageMiddleware from "redux-saga"
import mysaga from "../sagas"
 export const sagaMiddlewares = createSageMiddleware()
const rootReducer = combineReducers(
{ count: countReducer }
);
const configureStore = () => {
return createStore(rootReducer,applyMiddleware(sagaMiddlewares));
}
// sagaMiddlewares.run(mysaga)
export default configureStore;