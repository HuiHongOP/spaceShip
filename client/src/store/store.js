import { configureStore,combineReducers} from '@reduxjs/toolkit';
import handleCart from "../reducers/CartHandler";


const allReducers = combineReducers ({
    cartHandle: handleCart,
});


const store = configureStore({
    reducer:allReducers
})

export default store;