import './App.css';
import React, {useEffect,useState} from "react";
import NavBar from './components/NavBar';
import PopUpSignInForm from "./components/PopUpSignInForm";
import PopUpSignUpForm from './components/PopUpSignUpForm';
import Banner from "./components/Banner";
import Products from "./components/Products";
import Cart from "./components/Cart";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  const [backendData, setBackendData] = useState([{}]);
  useEffect(() =>{
    fetch("/api").then(
      response =>response.json()
    ).then(
      data =>{setBackendData(data)}
    )
  },[])
  return (
    <BrowserRouter>
        <div className="App">
        {/* {(typeof backendData.users === 'undefined') ? 
        (<p>Loading...</p>): 
        (backendData.users.map((user,i) =>(
          <p key={i}>{user}</p>
        )))
        } */}
          <div className = "content">
            <NavBar/>
            <Routes>
              <Route exact path="/" element ={<><Banner/><Products/></>} forceRefresh={true} >
              </Route>
              <Route exact path="/signIn" element ={<PopUpSignInForm/>} >
              </Route>
              <Route exact path="/signUp" element ={<PopUpSignUpForm/>} >
              </Route>
              <Route exact path="/checkCart" element ={<Cart/>} >
              </Route>
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
