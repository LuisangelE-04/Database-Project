import React, { useState } from 'react';
import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PackageDropdown from "./dropdowns/PackageSize";
import ShipmentType from "./dropdowns/ShipmentType";
import "../css/CreatePackage.css";

const CreatePackage = () => {
  const [customerEmail, setCustomerEmail] = useState(''); 
  const [recipientStreet, setRecipientStreet] = useState('');
  const [recipientCity, setRecipientCity] = useState('');
  const [recipientState, setRecipientState] = useState('');
  const [recipientZip, setRecipientZip] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    // Validate that the shipping date is not in the past
    if (shippingDate < today) {
      setErrorMessage("Shipping date cannot be in the past. Please select a valid date.");
      return;
    }

    // Validate that the delivery date is not earlier than the shipping date
    if (deliveryDate < shippingDate) {
      setErrorMessage("Delivery date cannot be earlier than the shipping date. Please select a valid date.");
      return;
    }

    // Clear any existing error message
    setErrorMessage("");

    try {
      const payload = {
        payload: {
          "senderEmail": customerEmail,
          "recipientStreet": recipientStreet,
          "recipientCity": recipientCity,
          "recipientState": recipientState,
          "recipientZipcode": recipientZip,
          "weight": weight,
          "dimensions": dimensions,
          "shippingMethod": shippingMethod,
          "shippingDate": shippingDate,
          "deliveryDate": deliveryDate
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

      const response = await instance.post(ENDPOINTS.AUTH.PACKAGE.CREATE_PACKAGE, payload);
      console.log(response.data);
      alert("Package Created Successfully");
      // window.location.href = "/employee-dashboard";
    } catch (error) {
      alert("Error: " + error);
      return;
    }
  };
  
  return (
    <>
      <div className="item-container">
        <h2>Enter Package Details</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-section">
            <h3>Customer Details</h3>
            <div className="form-group">
              <label>Customer Email:</label>
              <input
                type="text"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-section">
            <h3>Recipient Details</h3>
            <div className="form-group">
              <label>Recipient Street:</label>
              <input
                type="text"
                value={recipientStreet}
                onChange={(e) => setRecipientStreet(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Recipient City:</label>
              <input
                type="text"
                value={recipientCity}
                onChange={(e) => setRecipientCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Recipient State:</label>
              <input
                type="text"
                value={recipientState}
                onChange={(e) => setRecipientState(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Recipient Zip:</label>
              <input
                type="text"
                value={recipientZip}
                onChange={(e) => setRecipientZip(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-section">
            <h3>Package Details</h3>
            <div className="form-group">
              <label>Weight:</label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <PackageDropdown 
              onSelect={(value) => setDimensions(value)}
              />
            </div>

            <div className="form-group">
              <ShipmentType
              onSelect={(value) => setShippingMethod(value)}
              />
            </div>

            <div className="form-group">
              <label>Shipping Date:</label>
              <input
                type="date"
                value={shippingDate}
                onChange={(e) => setShippingDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Delivery Date:</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
              />
            </div>
          </div>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          <button type="submit">Create Package</button>
        </form>
      </div>
    </>
  );
};

export default CreatePackage;
