import { useState } from "react";
import PopUpSignInForm from "./PopUpSignInForm";

const Signin = () =>{
    const [isSigin, setSigin] = useState(false);

    const togglePopUpLogin = () =>{
        setSigin(true);
    }

    return(
        <div>
            <button onClick ={togglePopUpLogin}>Sign in</button>
            {isSigin && <PopUpSignInForm/>}
        </div>
    );
}
export default Signin;