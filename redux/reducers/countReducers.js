import { CHANGE_PRODUCT_STATUS, COUNTER_CHANGE, GET_PRODUCTS_SUCCESS, GET_USERS_SUCCESS } from '../constants';
const initialState = {
count: 0,
users:[],
products : []
};
const countReducer = (state = initialState, action) => {
switch(action.type) {
case COUNTER_CHANGE:
return {
...state,
count:action.payload
};
case GET_USERS_SUCCESS:
    return {
        ...state,
        users : action.users
    };
case GET_PRODUCTS_SUCCESS:
    return {
        ...state,
        products : action.products
    }
case CHANGE_PRODUCT_STATUS:
    let prodArr= [...state.products];
    prodArr.some((x)=>{
        if(x.id ==action.payload.id){
            x.downloadPath=action.payload.path;
            x.isDownloaded = action.payload.status;
        }
    })
    return {
        ...state,
        products : prodArr
    }
default:
return state;
}
}
export default countReducer;