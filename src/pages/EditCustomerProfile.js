import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { add } from "resolve-url-loader/lib/position-algerbra";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found. Redirecting to login.");
        window.location.href = '/customer-login';
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

        const response2 = await instance.get(ENDPOINTS.GET.CUSTOMER.PROFILE);

        console.log(response2.data);

        setFirstName(response2.data.firstName);
        setLastName(response2.data.lastName);
        setPhoneNumber(response2.data.phoneNumber);
        setAddress(response2.data.address.street);
        setCity(response2.data.address.city);
        setState(response2.data.address.state);
        setZip(response2.data.address.zipCode);

      } catch (error) {
        alert("Error: " + error.message);
      }
    };

    fetchProfile();
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        "firstName": firstName,
        "lastName": lastName,
        "phoneNumber": phoneNumber,
        "street": address,
        "city": city,
        "state": state,
        "zipcode": zip
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

      const response = await instance.put(ENDPOINTS.AUTH.CUSTOMER.EDIT_PROFILE, payload);
      console.log(response.data);
      alert("Profile Updated Successfully");
      window.location.href = "/customer-dashboard";

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

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="street"
            name="street"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipcode">Zip Code</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
    <Footer />
    </>
  );
}

export default EditProfile;