import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, BASE_URL } from '../endpoints/Endpoints';
import '../css/EmployeeLoginReport.css';

const PostOfficeInfo = ({ info }) => {
  return (
    <div className='report-item'>
      <h2>Post Office Information</h2>
      <p>Branch Name: {info.branchName}</p>
      {info.address && (
        <div>
          <p>Street: {info.address.street}</p>
          <p>City: {info.address.city}</p>
          <p>State: {info.address.state}</p>
          <p>Zip Code: {info.address.zipCode}</p>
        </div>
      )}
    </div>
  );
};

const EmployeeInfo = ({ employee }) => {
  return (
    <div className='report-inner-item'>
      <h3>Employee Information</h3>
      <p>First Name: {employee.employeeInfo.employeeId}</p>
      <p>First Name: {employee.employeeInfo.firstName}</p> 
      <p>Last Name: {employee.employeeInfo.lastName}</p> 
      <p>Phone Number: {employee.employeeInfo.phoneNumber}</p> 
      <p>Position: {employee.employeeInfo.position}</p> 
      <p>Created At: {employee.employeeInfo.createdAt}</p>

      {employee.recentLogins && (
        <div className='recent-logins'>
          <h4>Recent Logins</h4>
          {employee.recentLogins.map((login, index) => (
            <p key={index} className='login-time'>{login.loginTime}</p>
          ))}
        </div>
      )}
    </div>
  );
};

const EmployeeReport = ({ branchId }) => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchLoginReport = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        window.location.href = "/";
        return;
      }

      try {
        const instance = axios.create({
          baseURL: BASE_URL,
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            authentication: accessToken
          },
        });

        const response = await instance.get(`${ENDPOINTS.AUTH.MANAGER.EMPLOYEE_REPORT}?branchId=${branchId}`);

        console.log('API resposne', response.data);

        setReportData(response.data);

        
      } catch (error) {
        alert("Error: " + error.message);
      }
    };

    fetchLoginReport();

  }, [branchId]);

  return (
    <>
    <div className='report-container'>
      <div className='report-header'>
        <h2>Employee Recent Login</h2>
        <div className="report-list">
          {reportData ? (
            <>
            <PostOfficeInfo info={reportData.postOfficeInfo} />
            <h2>Employees</h2>
            {reportData.employees.map((employee, index) => (
              <EmployeeInfo key={index} employee={employee} />
            ))}
            </>
          ) : (
            <>
            <div className='loading'>
            <h3>Loading...</h3>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default EmployeeReport;