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
  const response = await axios.post(customerLoginEndpoint.fetch(), credentials);
  return response.data;
};

// Function to fetch customer data
export const getCustomerData = async (token) => {
  const response = await axios.get(customerProfileEndpoint.fetch(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
