import axios from 'axios';
import { useState,useEffect } from 'react';
import React from "react";
import { useNavigate } from "react-router-dom";

const PopUpSignInForm = () =>{
    const navigate = useNavigate();
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
            const access_token = response?.data?.access_token;
            const refresh_token = response?.data?.access_token;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token)
            setUser('');
            setPwd('');
            setSuccess(true);
            navigate("/")
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
    };

    return (
        <section className = "sign-in-section text-center m-3">
            <div>
                <form className="sign-in-form" onSubmit={handleSubmit}>
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