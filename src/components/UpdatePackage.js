import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS, BASE_URL } from '../endpoints/Endpoints';
import PackageStatus from "./dropdowns/PackageStatus";
import '../css/UpdatePackage.css';

const UpdatePackage = () => {
  const [packageId, setPackageId] = useState('');
  const [currentStatus, setStatus] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [currentBranchID, setCurrentBranchID] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userRole = localStorage.getItem("userType");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        payload: {
          "packageId": packageId,
          "status": currentStatus,
          "shippingDate": shippingDate,
          "deliveryDate": deliveryDate,
          "currentBranchId": currentBranchID,
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

      const response = await instance.put(ENDPOINTS.AUTH.PACKAGE.UPDATE_PACKAGE, payload);
      console.log(response.data);

      setShippingDate(response.data.shippingDate);
      setDeliveryDate(response.data.deliveryDate);
      setSuccessMessage("Package Updated Successfully");
      alert("Package Updated Successfully");
      setTimeout(() => {
        window.location.href = `/${userRole}-dashboard`;
      }, 0);
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  return (
    <div className="update-package-container">
      <h2>Update Package</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Package ID:</label>
          <input
            type="text"
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <PackageStatus onSelect={(value) => setStatus(value)} required={true} />
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
        <div className="form-group">
          <label>Current Branch ID:</label>
          <input
            type="text"
            value={currentBranchID}
            onChange={(e) => setCurrentBranchID(e.target.value)}
            required
          />
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Update Package</button>
      </form>
    </div>
  );
};

export default UpdatePackage;
