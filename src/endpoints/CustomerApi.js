import axios from 'axios';
import { createENDPOINT, ENDPOINTS } from './Endpoints';

const customerRegisterEndpoint = createENDPOINT(ENDPOINTS.AUTH.CUSTOMER.REGISTER);
const customerLoginEndpoint = createENDPOINT(ENDPOINTS.AUTH.CUSTOMER.LOGIN);
const customerProfileEndpoint = createENDPOINT(ENDPOINTS.AUTH.CUSTOMER.PROFILE); 

// Function to register a new customer
export const customerRegister = async (userData) => {
  const response = await axios.post(customerRegisterEndpoint.fetch(), userData);
  return response.data;
};

// Function to login a customer
export const customerLogin = async (credentials) => {
  try {
    const response = await axios.post(customerLoginEndpoint.fetch(), credentials);
    
    // Check if the response contains a token
    if (response.data && response.data.token) {
      return response.data; // Return the full response including the token
    } else {
      throw new Error("Login failed: No token received");
    }
  } catch (error) {

    console.error("Login error:", error);
    throw error; 
  }
};

// Function to fetch customer data
export const getCustomerData = async (token) => {
  const url = await customerProfileEndpoint.fetch(); 
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

