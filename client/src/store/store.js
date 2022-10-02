import { configureStore,combineReducers} from '@reduxjs/toolkit';
import handleCart from "../reducers/CartHandler";
import productStorage from '../reducers/productStorage';

const allReducers = combineReducers ({
    cartHandle: handleCart,
    productStorage: productStorage,
    
});


const store = configureStore({
    reducer:allReducers
})

export default store;