import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, ENDPOINTS } from "../endpoints/Endpoints";
import "../css/AddDependent.css";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AddDependent = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        employeeId: employeeID,
        firstName,
        lastName,
        relationship,
        dateOfBirth,
        sex,
      };

      const accessToken = localStorage.getItem("accessToken");
      const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          "Content-Type": "application/json",
          authentication: accessToken
        },
      });

      await instance.post(ENDPOINTS.AUTH.EMPLOYEE.ADD_DEPENDENT, payload);
      alert("Dependent Added Successfully");
      navigate('/employee-dashboard');  // Redirect to employee dashboard or any other page
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="add-dependent-container">
        <h2>Add Dependent</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee ID:</label>
            <input
              type="text"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              required
            />
          </div>
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
            <label>Relationship:</label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Sex:</label>
            <select value={sex} onChange={(e) => setSex(e.target.value)} required>
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <button type="submit">Add Dependent</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddDependent;