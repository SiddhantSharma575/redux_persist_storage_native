import  { call, put,  takeEvery}  from "redux-saga/effects"
import { GET_PRODUCTS_FETCH, GET_PRODUCTS_SUCCESS, GET_USERS_FETCH, GET_USERS_SUCCESS } from "./constants";

function usersFetch() {
   return   fetch("https://jsonplaceholder.typicode.com/users").then(response => response.json())
}

function fetchProduct() {
    return fetch("https://dummyjson.com/products").then(response => response.json())
}

function* workGetUsersFetch() {
    const users = yield call(usersFetch)
    yield put({
        type : GET_USERS_SUCCESS,
        users
    })
}

function* workGetProductFetch() {
    const { products } = yield call(fetchProduct)
    const newProducts = products.map((product) => {
        return {
            ...product,
            isDownloaded : false,
            downloadPath : ""
        }
    })
    yield put({
        type : GET_PRODUCTS_SUCCESS,
        products : newProducts
    })
}

function* mySaga() {
    yield takeEvery(GET_USERS_FETCH, workGetUsersFetch)
    yield takeEvery(GET_PRODUCTS_FETCH, workGetProductFetch)
}

export default mySaga;