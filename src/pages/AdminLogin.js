import React, { useEffect, useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { createENDPOINT, ENDPOINTS } from '../endpoints/Endpoints';
import { useAuth } from "../endpoints/AuthContext";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const ManagerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedin, setIsLoggedIn } = useAuth();
  const userRole = localStorage.getItem("userType");

  useEffect(() => {
    if (isLoggedin) {
      window.location.href = `/${userRole}-dashboard`;
    }
  }, [isLoggedin, userRole]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        payload: {
          "email": email,
          "password": password,
        }
      };

      const response = await createENDPOINT(ENDPOINTS.AUTH.EMPLOYEE.LOGIN).post(payload);
      if (!response || response.status !== 200) {
        throw new Error(response.error);
      }

      const accessToken = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userType", "manager");
      
      window.location.href = "/manager-dashboard";
      alert("Login Successful");

    } catch (error) {
      alert("Error: " + error.message);
      return;
    }
  };

  return (
    <>
    <NavBar />
    <div className="login-container">
      <h2>Manager Login</h2>
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
    <div className="white-space"></div>
    <Footer />
    </>
  );
};

export default ManagerLogin;
