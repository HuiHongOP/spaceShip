import axios from 'axios';
import { useRef, useState,useEffect } from 'react';

const PopUpSignInForm = () =>{
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState("");
    const [password, setPwd] = useState("");
    const [err, setErr] = useState("");
    //const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect (() => {
        setErr("");
    },[username, password])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await axios.post("spaceshipusers.herokuapp.com/login", 
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

    return (
        <section className = "text-center m-3">
        <p ref={errRef} className={err ? "err" : "offscreen"} aria-live="assertive">{err}</p>
            <div>
                <h2>Welcome to Sign in Form</h2>
                <form action="/" ref={userRef} method="get" onSubmit={handleSubmit}>
                    <div>
                        <label for="name">Username</label>
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
        <p></p>
        </section>
    );
}
export default PopUpSignInForm;