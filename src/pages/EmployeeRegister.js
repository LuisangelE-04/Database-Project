import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createENDPOINT, ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";
import "../css/Register.css"
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const EmployeeRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [branchID, setBranchID] = useState('');
  const [managerID, setManagerID] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        payload: {
          "firstName": firstName,
          "lastName": lastName,
          "DOB": dob,
          "email": email,
          "phoneNumber": phoneNumber,
          "position": position,
          "password": password,
          "branchId": branchID,
          "managerId": managerID || null
        }
      };

      const accessToken = localStorage.getItem("accessToken");
      const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          authentication: accessToken
        },
      });

      //const response = await instance.post(createENDPOINT(ENDPOINTS.AUTH.MANAGER.EMPLOYEE_REGISTER), payload);
      const response = await instance.post(ENDPOINTS.AUTH.MANAGER.EMPLOYEE_REGISTER, payload);
      console.log(response.data);
      alert("Account Created Successfully");
      navigate('/employee-dashboard');
    } catch (error) {
      alert("Error: " + error.message);
      return;
    }
  };

  return (
    <>
      <NavBar />
      <div className="register-container">
        <h2>Employee Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Position:</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Branch ID:</label>
            <input
              type="text"
              value={branchID}
              onChange={(e) => setBranchID(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Manager ID:</label>
            <input
              type="text"
              value={managerID}
              onChange={(e) => setManagerID(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EmployeeRegister;