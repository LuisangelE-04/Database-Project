import React, { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, BASE_URL } from '../endpoints/Endpoints';
import '../css/PackageUpdate.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const UpdatePackage = () => {
    const [packageId, setPackageId] = useState('');
    const [currentStatus, setStatus] = useState('');
    const [shippingDate, setShippingDate] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [currentBranchID, setCurrentBranchID] = useState('');

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
                    "Content-Type": "application/json",
                    authentication: accessToken
                },
            });

            const response = await instance.put(ENDPOINTS.AUTH.PACKAGE.UPDATE_PACKAGE, payload);
            alert("Package Updated Successfully");
            window.location.href = "/employee-dashboard";
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <>
        <NavBar />
        <div className="update-package-container">
            <h2>Update Package</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="packageId">Package ID</label>
                    <input
                        type="text"
                        id="packageId"
                        name="packageId"
                        value={packageId}
                        onChange={(e) => setPackageId(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Current Status</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={currentStatus}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="shippingDate">Shipping Date</label>
                    <input
                        type="date"
                        id="shippingDate"
                        name="shippingDate"
                        value={shippingDate}
                        onChange={(e) => setShippingDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="deliveryDate">Delivery Date</label>
                    <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="currentBranchID">Current Branch ID</label>
                    <input
                        type="text"
                        id="currentBranchID"
                        name="currentBranchID"
                        value={currentBranchID}
                        onChange={(e) => setCurrentBranchID(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Update Package</button>
            </form>
        </div>
        <Footer />
        </>
    );
};

export default UpdatePackage;