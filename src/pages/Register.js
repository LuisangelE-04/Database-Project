import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Register.css"
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { createENDPOINT, ENDPOINTS } from "../endpoints/Endpoints";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZip] = useState('');

  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        payload: {
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "phoneNumber": phoneNumber,
          "password": password,
          "street": street,
          "city": city,
          "state": state,
          "zipcode": zipcode
        }
      };
      
      
      const response = await createENDPOINT(ENDPOINTS.AUTH.CUSTOMER.REGISTER).post(payload);
      alert("Account Created Successfully");
      navigate('/login');

    } catch (error) {
      alert("Error: " + error.message);
      return;
    }
  };

  return (
    <>
      <NavBar />
      <div className="register-container">
        <h2>Create New Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="John"
              autoComplete="given-name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Doe"
              autoComplete="family-name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john.doe@example.com"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="123-456-7890"
              autoComplete="tel"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              name="street"
              onChange={(e) => setStreet(e.target.value)}
              required
              placeholder="123 Main St"
              autoComplete="street-address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="Houston"
              autoComplete="address-level2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="TX"
              autoComplete="address-level1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zip Code:</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              onChange={(e) => setZip(e.target.value)}
              required
              placeholder="77002"
              autoComplete="postal-code"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
