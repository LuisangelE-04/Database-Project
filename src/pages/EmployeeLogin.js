import React, { useState } from 'react';
import '../css/Login.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const EmployeeLogin = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Employee ID:', employeeId);
    console.log('Password:', password);
  };

  return (
    <>
    <NavBar />
    <div className="login-container">
      <h2>Employee Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
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