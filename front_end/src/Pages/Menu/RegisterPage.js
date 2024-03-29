// RegisterPage.js
import React, { useState } from "react";
import "./Register.css";
import axios from 'axios';

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_Password] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      if (password !== re_password) {
        setError("Passwords do not match");
        return;
      }

      const userData = { name, email, password, re_password };
      const response = await axios.post('http://localhost:8000/auth/register/', userData); // Update the URL
      console.log("User registered successfully:", response.data);
            // Redirect or show success message
        } catch (error) {
            console.error("Registration failed:", error);
            // Handle error
            setError("Registration failed: " + error.message);
        }
    };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <div className="input-group">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Re-enter Password</label>
        <input
          type="password"
          placeholder="Re-enter your password"
          value={re_password}
          onChange={(e) => setRe_Password(e.target.value)}
        />
      </div>
      <div className="register-button">
        <button className="buttons-color" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
