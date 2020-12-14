import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history=useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(username==="test" && password==="1234"){
        localStorage.setItem("username",username);
        localStorage.setItem("password",password);
        history.push('/dashboard');
        console.log("Successfully Logged In");
    }else{
        alert("Invalid Username /Password.");
    }
    
  };
  return (
    <div className="container mt-5">
      <h1>Welcome to Login page</h1>
      <form className="mt-5 p-5 border rounded" >
        <div className="form-group">
          <h5 className="text-left font-weight-bold">Username</h5>
          <input
            type="text"
            placeholder="Enter Username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <h5 className="text-left font-weight-bold">Password</h5>
          <input
            type="password"
            placeholder="Enter Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="button"
          className="btn btn-success btn-lg btn-block"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
