import axios from 'axios';
import { useState,useEffect } from 'react';

const PopUpSignInForm = () =>{

    const [username, setUser] = useState("");
    const [password, setPwd] = useState("");
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);
    let componentMounted = true;
    
    useEffect (() => {
        setErr("");
    },[username, password])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await axios.post("/login", 
                JSON.stringify({username, password}), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }

            )
            const accessToken = response?.data?.accessToken;
            localStorage.setItem("accessToken", accessToken);
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (error) {
            if (!err?.response) {
                setErr('No Server Response');
            } else if (err.response?.status === 400) {
                setErr('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErr('Unauthorized');
            } else {
                setErr('Login Failed');
            }
        }
    }

    return (
        <section className = "sign-in-section text-center m-3">
            <div>
                <form className="sign-in-form" action="/" method="get" onSubmit={handleSubmit}>
                    <h2>Welcome to Sign in Form</h2>
                    <div>
                        <label for="name">Username/Email Address</label>
                        <input type="text" name="userName" placeholder="Input Username" onChange = { (e) => setUser(e.target.value)} required/>
                    </div>
                    <div>
                        <label for ="password">Password</label>
                        <input type="password" name="password" placeholder="Input Password" onChange = { (e) => setPwd(e.target.value)}  required/>
                    </div>
                    <div>
                        <input type="submit" value="Login"/>
                    </div>
                </form>
            </div>
        </section>
    );
}
export default PopUpSignInForm;