import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { createENDPOINT, ENDPOINTS } from '../endpoints/Endpoints';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const ManagerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        payload: {
          "email": email,
          "password": password,
        }
      };

      const response = await createENDPOINT(ENDPOINTS.AUTH.MANAGER.LOGIN).post(payload);
      if (!response || response.status !== 200) {
        throw new Error(response.error);
      }

      const accessToken = response.data;
      localStorage.setItem("accessToken", accessToken);
      
      alert("Login Successful");
      navigate('/managerdashboard');

    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
    <NavBar />
    <div className="login-container manager-login">
      <h2>Admin Login</h2>
      <p>Log in with admin credentials</p>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default ManagerLogin;
