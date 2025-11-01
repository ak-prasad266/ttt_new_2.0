// src/components/Login.js
import React, { useState } from "react";
import { login } from "../api";
import "./Login.css";

const Login = ({ navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    try {
      const resp = await login({ username, password });
      const token = resp.data.token;
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("userLoggedIn"));
      alert("Login successful");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login failed. Check credentials and backend.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handle} className="login-form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
