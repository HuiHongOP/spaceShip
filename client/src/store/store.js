import { configureStore,combineReducers} from '@reduxjs/toolkit';
import IsLoggedReducer from '../reducers/IsLogged';
import SignUpReducer from '../reducers/SignUp';

const allReducers = combineReducers ({
    isLogged: IsLoggedReducer,
    signUp: SignUpReducer
});


const store = configureStore({
    reducer:allReducers
})

export default store;