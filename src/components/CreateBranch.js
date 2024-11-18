import React, { useState } from 'react';
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../endpoints/Endpoints";
import "../css/CreatePackage.css";

const CreateBranch = () => {
  const [branchName, setBranchName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userRole = localStorage.getItem("userType");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing error message
    setErrorMessage("");

    try {
      const payload = {
        payload: {
          "branchName": branchName,
          "email": email,
          "phoneNumber": phoneNumber,
          "street": street,
          "city": city,
          "state": state,
          "zipcode": zipcode
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

      const response = await instance.post(ENDPOINTS.POST.MANAGER.CREATE_POST_OFFICE, payload);
      console.log(response.data);

      if (response.data?.branchId) {
        alert("Branch Created Successfully");
        // Redirect after successful creation
        setTimeout(() => {
          window.location.href = `/${userRole}-dashboard`;
        }, 0);
      }

      // Reset form values
      /*setBranchName("");
      setEmail("");
      setPhoneNumber("");
      setStreet("");
      setCity("");
      setState("");
      setZipCode("");*/

    } catch (error) {
      setErrorMessage("Error: " + error.response?.data?.message || "An error occurred while creating the branch");
      return;
    }
  };

  return (
    <>
      <div className="item-container">
        <h2>Create New Branch</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-section">
            <div className="form-group">
              <label>Branch Name:</label>
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
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
              <label>Street:</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>State:</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
          </div>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          <button type="submit">Create Branch</button>
        </form>
      </div>
    </>
  );
};

export default CreateBranch;
