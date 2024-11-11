import axios from 'axios';

export const BASE_URL = 'https://b5d6-129-7-0-8.ngrok-free.app/api/';
//export const BASE_URL = 'http://shipit.eastus.azurecontainer.io:4000/api/';

export const ENDPOINTS = {
  AUTH: {
    EMPLOYEE: {
      LOGIN: 'auth/employee-login',
      REGISTER: 'auth/employee-register'
    },
    CUSTOMER: {
      LOGIN: 'auth/customer-login',
      REGISTER: 'auth/customer-register',
    },
    MANAGER: {
      EMPLOYEE_REGISTER: 'auth/employee-register',
      EMPLOYEE_REPORT: 'employee/employees-and-logins-report',
      TRACKING_REPORT: 'employee/package-and-tracking-report'
    },
    PACKAGE: {
      GET_HISTORY: 'customer/tracking-history',
      UPDATE_PACKAGE: 'employee/update-package',
      CREATE_PACKAGE: 'employee/create-new-package',
    }
  },
  GET: {
    CUSTOMER: {
      PROFILE: 'customer/profile',
      TRACKING: 'customer/tracking-history'
    },
    EMPLOYEE: {
      PROFILE: 'employee/profile'
    }
  }
};

export const createENDPOINT = (endpoint) => {
  let url = BASE_URL + endpoint + '/';
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (body) => axios.post(url, body),
    put: (id, body) => axios.put(url + id, body),
    patch: (id, body) => axios.patch(url + id, body),
  }
}
