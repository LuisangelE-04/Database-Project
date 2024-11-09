import React, { useState } from 'react';
import { createENDPOINT, ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

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


  };
  
  return (
    <>
    <div className="item-container">
      <h2>Enter Pacakge Details</h2>
      <form onSubmit={handleSubmit}>

      </form>
    </div>
    </>
  );
};

export default CreatePackage;
