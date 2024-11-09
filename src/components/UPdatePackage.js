import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createENDPOINT, ENDPOINTS,BASE_URL } from '../endpoints/Endpoints';
const UpdatePackage = () => {
    const[packageId, setPackageId]=useState('');
    const[currentStatus, setStatus]=useState('');
    const[shippingDate, setShippingDate]=useState('');
    const[deliveryDate, setDeliveryDate]=useState('');
    const[currentBranchID, setCurrentBranchID]=useState('');



const navigate = useNavigate();

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
    const response = await instance.put(ENDPOINTS.AUTH.TRACKING.UPDATE_PACKAGE, payload);
    console.log(response.data);
    alert("Package Updated Successfully");
    navigate('/employee-dashboard');
  } catch (error) {
    alert("Error: " + error.message);
    return;
  }
};
return (
    <>
    <div className="item-container">
      <h2>Package Updated</h2>
      <form onSubmit={handleSubmit}>

      </form>
    </div>
    </>
  );
};


export default UpdatePackage;






