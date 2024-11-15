import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const EditEmployeeProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [DOB, setDOB] = useState("");


  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found. Redirecting to login.");
        alert("You must be logged in to view this page.");
        window.location.href = '/';
        return;
      }

      try {
        const instance = axios.create({
          baseURL: BASE_URL,
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            authentication: accessToken
          },
        });

        const response = await instance.get(ENDPOINTS.GET.EMPLOYEE.PROFILE);

        console.log(response.data);

        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhoneNumber(response.data.phoneNumber);
        setDOB(response.data.DOB);
        
      } catch (error) {
        alert("Error: " + error.message);
      }
    };

    fetchProfile();
    
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        "firstName": firstName,
        "lastName": lastName,
        "DOB": DOB,
        "phoneNumber": phoneNumber
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

      const response = await instance.put(ENDPOINTS.AUTH.EMPLOYEE.EDIT_PROFILE, payload);
      console.log(response.data);
      alert("Profile updated successfully.");
      window.location.href = '/employee-dashboard';
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
    <NavBar />
    <div className="update-package-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default EditEmployeeProfile;