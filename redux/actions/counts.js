import { CHANGE_PRODUCT_STATUS, COUNTER_CHANGE, GET_PRODUCTS_FETCH, GET_USERS_FETCH } from '../constants';
export function changeCount(count) {
return {
type: COUNTER_CHANGE,
payload: count
}
}

export function getUsersFetch() {
    return {
        type : GET_USERS_FETCH
    }
}

export function getProductFetch() {
    return  {
        type : GET_PRODUCTS_FETCH
    }
}

export function changeProductStatus(id,status,path) {
    return {
        type : CHANGE_PRODUCT_STATUS,
        payload  : {
            id,    
            status,
            path
        }
    }
}