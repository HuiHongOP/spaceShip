import { configureStore,combineReducers} from '@reduxjs/toolkit';
import IsLoggedReducer from '../reducers/IsLogged';
import SignUpReducer from '../reducers/SignUp';
import handleCart from "../reducers/CartHandler";
import cartClick from "../reducers/cartClick";


const allReducers = combineReducers ({
    isLogged: IsLoggedReducer,
    signUp: SignUpReducer,
    cartHandle: handleCart,
    cartCheck: cartClick,
});


const store = configureStore({
    reducer:allReducers
})

export default store;