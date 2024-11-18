import axios from 'axios';

//export const BASE_URL = 'http://localhost:4000/api/';
// export const BASE_URL = 'https://e630-76-142-23-132.ngrok-free.app/';
export const BASE_URL = 'http://ec2-34-207-133-247.compute-1.amazonaws.com:8080/api/';

export const ENDPOINTS = {
  AUTH: {
    EMPLOYEE: {
      LOGIN: 'auth/employee-login',
      REGISTER: 'auth/employee-register',
      EDIT_PROFILE: 'employee/edit-profile',
      ADD_DEPENDENT: 'employee/add-dependent',
    },
    CUSTOMER: {
      LOGIN: 'auth/customer-login',
      REGISTER: 'auth/customer-register',
      EDIT_PROFILE: 'customer/edit-profile',
      DELETE_PROFILE: 'auth/delete-customer-account',
    },
    MANAGER: {
      EMPLOYEE_REGISTER: 'auth/employee-register',
      EMPLOYEE_REPORT: 'employee/employees-and-logins-report',
      TRACKING_REPORT: 'employee/package-and-tracking-report',
      DEPENDENT_REPORT: 'employee/employee-and-dependents-report',
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
      TRACKING: 'customer/tracking-history',
      CANCEL_PACKAGE: 'customer/cancel-package',
      MAKE_PAYMENT: 'customer/make-payment',
      NOTIFICATIONS: 'customer/notifications',
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