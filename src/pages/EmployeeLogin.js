import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { createENDPOINT, ENDPOINTS } from '../endpoints/Endpoints';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const EmployeeLogin = () => {
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

      const response = await createENDPOINT(ENDPOINTS.AUTH.EMPLOYEE.LOGIN).post(payload);
      alert("Login Successful");
      navigate('/employeedashboard');

    } catch (error) {
      alert("Error: " + error.message);
      return;
    }
  };

  return (
    <>
    <NavBar />
    <div className="login-container">
      <h2>Employee Login</h2>
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

export default EmployeeLogin;