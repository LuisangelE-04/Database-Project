import React, { useState } from 'react';
import axios from "axios";
import { createENDPOINT, ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PackageDropdown from "./dropdowns/PackageSize";
import PackageStatus from "./dropdowns/PackageStatus";
import ShipmentType from "./dropdowns/ShipmentType";
import "../css/CreatePackage.css";

const CreatePackage = () => {
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [customerStreet, setCustomerStreet] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [customerZip, setCustomerZip] = useState('');
  const [recipientStreet, setRecipientStreet] = useState('');
  const [recipientCity, setRecipientCity] = useState('');
  const [recipientState, setRecipientState] = useState('');
  const [recipientZip, setRecipientZip] = useState(''); // "recipientZipcode": "77076" && "customerZipcode": "77076"
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [amount, setAmount] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [status, setStatus] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* New payload for creating a package
    payload: {
      "customerEmail": customerEmail,
      "recipientStreet": recipientStreet,
      "recipientCity": recipientCity,
      "recipientState": recipientState,
      "recipientZipcode": recipientZip,
      "weight": weight,
      "acount": amount,
      "dimensions": dimensions,
      "shippingMethod": shippingMethod,
      "status": status,
      "shippingDate": shippingDate,
      "deliveryDate": deliveryDate
    }
    */

    try {
      const payload = {
        payload: {
          "customerFirstName": customerFirstName,
          "customerLastName": customerLastName,
          "customerStreet": customerStreet,
          "customerCity": customerCity,
          "customerState": customerState,
          "customerZipcode": customerZip,
          "recipientStreet": recipientStreet,
          "recipientCity": recipientCity,
          "recipientState": recipientState,
          "recipientZipcode": recipientZip,
          "weight": weight,
          "dimensions": dimensions,
          "amount": amount,
          "shippingMethod": shippingMethod,
          "status": status,
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
      window.location.href = "/employee-dashboard";
    } catch (error) {
      alert("Error: " + error);
      return;
    }
  };
  
  return (
    <>
      <NavBar />
      <div className="item-container">
        <h2>Enter Package Details</h2>
        <form onSubmit={handleSubmit} className="form-container">
          {/* Remove customer details, replace with customer email only */
          <div className="form-section">
            <h3>Customer Details</h3>
            <div className="form-group">
              <label>Customer First Name:</label>
              <input
                type="text"
                value={customerFirstName}
                onChange={(e) => setCustomerFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Customer Last Name:</label>
              <input
                type="text"
                value={customerLastName}
                onChange={(e) => setCustomerLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Customer Street:</label>
              <input
                type="text"
                value={customerStreet}
                onChange={(e) => setCustomerStreet(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Customer City:</label>
              <input
                type="text"
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Customer State:</label>
              <input
                type="text"
                value={customerState}
                onChange={(e) => setCustomerState(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Customer Zip:</label>
              <input
                type="text"
                value={customerZip}
                onChange={(e) => setCustomerZip(e.target.value)}
                required
              />
            </div>
          </div>
          /* END OF SECTION TO REMOVE */
          }
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
              <label>Dimensions:</label>
              <PackageDropdown 
              onSelect={(value) => setDimensions(value)}
              />
            </div>

            <div className="form-group">
              <label>Shipping Method:</label>
              <ShipmentType
              onSelect={(value) => setShippingMethod(value)}
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <PackageStatus 
              onSelect={(value) => setStatus(value)}
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
          <button type="submit">Create Package</button>
        </form>
      </div>
      <Footer /> 
    </>
  );
};

export default CreatePackage;
