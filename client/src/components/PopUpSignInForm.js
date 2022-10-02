import axios from 'axios';
import { useRef, useState,useEffect } from 'react';
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const PopUpSignInForm = () =>{

    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const [username, setUser] = useState("");
    const [password, setPwd] = useState("");
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect (() => {
        setErr("");
    },[username, password])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await axios.post("https://spaceshipacc.herokuapp.com/api/user/login", 
                JSON.stringify({
                    username: username,
                    password: password
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response)
            if (response.status == 200){
                const access_token = response?.data?.access_token;
                const refresh_token = response?.data?.access_token;
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("refresh_token", refresh_token);
                Cookies.set("username", username)
                setUser('');
                setPwd('');
                setSuccess(true);
                navigate("/")
            } else {
                setErr(response.error)
            }
        } catch (error) {
            if (!error?.response) {
                setErr('No Server Response');
            } else if (error.response?.status === 400) {
                setErr('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErr('Unauthorized');
            } else {
                setErr('Login Failed');
            }
        }
    };

    return (
        <section className = "text-center m-3">
            <div>
                <h2>Welcome to Sign in Form</h2>
                <form action="/" ref={userRef} method="get" onSubmit={handleSubmit}>
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
        <p style={{color:'red'}} ref={errRef} className={err ? "err" : "offscreen"} aria-live="assertive">{err}</p>
        </section>
    );
}
export default PopUpSignInForm;