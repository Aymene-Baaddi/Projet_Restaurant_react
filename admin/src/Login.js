import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3012/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        setMessage('Login successful');
        setIsAuthenticated(true);
        
        localStorage.setItem('isAuthenticated', 'true');
  
         navigate('/test');
      }
    } catch (error) {
      setMessage('Authentication failed. Please check your email and password.');
    }
  };

  return (
    <div className="login-container">
    
      <div className="login-card">
       <p>Enter your email and password to login</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;
