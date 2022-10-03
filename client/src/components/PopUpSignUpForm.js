import axios from 'axios';
import { useRef, useState,useEffect } from 'react';
import React from "react";
import { useNavigate } from "react-router-dom";


const PopUpSignUpForm = () =>{
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const [username, setUser] = useState("");
    const [password, setPwd] = useState("");
    const [err, setErr] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect (() => {
        setErr("");
    },[username, email, password])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await axios.post("https://spaceshipacc.herokuapp.com/api/user/accounts", 
                JSON.stringify({
                    username:username,
                    email:email,
                    password:password,                  
                    isadmin:true
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response)
            if (response.status == 200){
                setUser('');
                setPwd('');
                setEmail('');
                setSuccess(true);
                navigate("/signIn")
                window.location.reload(false);
            } 
        } catch (error) {
            if (!err?.response) {
                setErr('No Server Response');
            } else if (err.response?.status === 400) {
                setErr('Missing Username, email or Password');
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
                        <input type="text" name="userName" placeholder="Input Username" onChange = { (e) => setUser(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="email">email</label>
                        <input type="email" name="email" placeholder="Enter your email address" required/>
                    </div>
                    <div>
                        <label for="email">Re-enter email</label>
                        <input type="email" name="email" placeholder="Re-enter your email address" onChange = { (e) => setEmail(e.target.value)} required/>
                    </div>
                    <div>
                        <label for ="password">Password: </label>
                        <input type="text" name="password" placeholder="Input Password" onChange = { (e) => setPwd(e.target.value)} required/>
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