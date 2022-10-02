import axios from 'axios';
import {useRef, useState,useEffect } from 'react';


const PopUpSignUpForm = () =>{
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState("");
    const [password, setPwd] = useState("");
    const [err, setErr] = useState("");
    //const [success, setSuccess] = useState(false);
    //let componentMounted = true;
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect (() => {
        setErr("");
    },[username, password])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await axios.post("spaceshipusers.herokuapp.com/accounts", 
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
            //setSuccess(true);
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

    return(
        <section className = "text-center m-3">
            <p ref={errRef} className={err ? "err" : "offscreen"} aria-live="assertive">{err}</p>
            <div>
                <h2>Welcome to Sign Up Form</h2>
                <form action="/" ref={userRef}  method="get" onSubmit={handleSubmit}>
                    <div>
                        <label for="name">Username</label>
                        <input type="text" name="userName" placeholder="Input Username" required/>
                    </div>
                    <div>
                        <label for="email">email</label>
                        <input type="email" name="email" placeholder="Enter your email address" required/>
                    </div>
                    <div>
                        <label for="email">Re-enter email</label>
                        <input type="email" name="email" placeholder="Re-enter your email address" required/>
                    </div>
                    <div>
                        <label for ="password">Password: </label>
                        <input type="text" name="password" placeholder="Input Password" required/>
                    </div>
                    <div>
                        <label for ="password">Re-enter Password: </label>
                        <input type="text" name="password" placeholder="Re-enter Password" required/>
                    </div>
                    <div>
                        <input type="submit" value="Sign UP"/>
                    </div>
                </form>
            </div>
    </section>  
    );
}

export default PopUpSignUpForm;