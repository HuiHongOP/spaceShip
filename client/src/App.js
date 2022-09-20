import './App.css';
import React, {useEffect,useState} from "react";
import NavBar from './components/NavBar';
import {useSelector} from "react-redux";
import PopUpSignInForm from "./components/PopUpSignInForm";
import PopUpSignUpForm from './components/PopUpSignUpForm';
import Banner from "./components/Banner";
import Products from "./components/Products";


function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() =>{
    fetch("/api").then(
      response =>response.json()
    ).then(
      data =>{setBackendData(data)}
    )
  },[])
  const isLogin = useSelector((state)=>state.isLogged);
  const signUp = useSelector((state)=>state.signUp);

  return (
    <div className="App">
      {/* {(typeof backendData.users === 'undefined') ? 
      (<p>Loading...</p>): 
      (backendData.users.map((user,i) =>(
        <p key={i}>{user}</p>
      )))
      } */}
      <NavBar/>
      {isLogin && <PopUpSignInForm />}
      {signUp && <PopUpSignUpForm/>}
      <Banner/>
      <Products/>
    </div>
  );
}

export default App;
