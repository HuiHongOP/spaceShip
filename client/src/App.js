import logo from './logo.svg';
import './App.css';
import React, {useEffect,useState} from "react";
import NavBar from './components/NavBar';

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
    <div className="App">
      {/* {(typeof backendData.users === 'undefined') ? 
      (<p>Loading...</p>): 
      (backendData.users.map((user,i) =>(
        <p key={i}>{user}</p>
      )))
      } */}
      <NavBar/>
    </div>
  );
}

export default App;
