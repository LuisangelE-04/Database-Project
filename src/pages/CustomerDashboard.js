import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import LogOut from "../components/Logout";
import "../css/Dashboard.css";
import { createENDPOINT, ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";


const CustomerDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        window.location.href = "/login";
        return;
      }

      const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          "Content-Type": "application/json",
          authentication: accessToken
        },
      });

      const response = await instance.get(ENDPOINTS.GET.CUSTOMER.PROFILE);

      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setAddress(response.data.address);
      setStreet(response.data.address.street);
      setCity(response.data.address.city);
      setState(response.data.address.state);
      setZip(response.data.address.zip);
  };
  
  fetchData();

  }, []);

  return (
    <>
      <NavBar />
      <div>
        <h1>Welcome, {firstName}</h1>
        <div className="dashboard-container">

        </div>
      </div>
      <Footer />
    </>
  )
};

export default CustomerDashboard;