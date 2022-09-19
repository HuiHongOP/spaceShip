import {login,signUp} from "../actions/index";
import { useDispatch } from "react-redux";

const AccountManage = () =>{
    const dispatch = useDispatch();
    return(
        <div>
            <button onClick ={ () => dispatch(login())} >Sign in</button>
            <button onClick ={ () => dispatch(signUp())} >Sign Up</button>
        </div>
    );
}
export default AccountManage;