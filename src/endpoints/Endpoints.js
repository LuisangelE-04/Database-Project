import axios from 'axios';

//export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/';
export const BASE_URL = 'https://24cf-76-142-23-132.ngrok-free.app/';

export const ENDPOINTS = {
  AUTH: {
    EMPLOYEE: {
      LOGIN: 'auth/employee-login',
      REGISTER: 'auth/employee-register',
    },
    CUSTOMER: {
      LOGIN: 'auth/customer-login',
      REGISTER: 'auth/customer-register',
    },
    TRACKING: {
      GET_HISTORY: 'customer/tracking-history',
      UPDATE_PACKAGE: 'employee/update-package',
      CREATE_PACKAGE: 'employee/create-package',
    }
  }
};

export const createENDPOINT = (endpoint) => {
  let url = BASE_URL + 'api/' + endpoint + '/';
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (body) => axios.post(url, body),
    put: (id, body) => axios.put(url + id, body),
    patch: (id, body) => axios.patch(url + id, body),
  }
}
