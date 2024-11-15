import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";
import "../css/Report.css";

const EmployeeReport = () => {
  const [reportData, setReportData] = useState([]);
  const [postOffice, setPostOffice] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployeeReport = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        window.location.href = "/login";
        return;
      }

      const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          authentication: accessToken,
        },
      });
      const response = await instance.get(
        `${BASE_URL}${ENDPOINTS.AUTH.MANAGER.EMPLOYEE_REPORT}`
      );
      console.log(response.data);
      setReportData(response.data.employees);
      setPostOffice(response.data.postOfficeInfo);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch employee report.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeReport();
  }, []);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="dashboard-container">
        <h2>Employee Login Report</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Activity ID</th>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Login Time</th>
              <th>Branch ID</th>
              <th>Branch Name</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((entry) => {
              return entry.recentLogins.map((v) => {
                return (
                  <tr key={v.activityId}>
                    <td>{v.activityId}</td>
                    <td>{v.employeeId}</td>
                    <td>
                      {entry.employeeInfo.firstName}{" "}
                      {entry.employeeInfo.lastName}
                    </td>
                    <td>{new Date(v.loginTime).toLocaleString()}</td>
                    <td>{v.branchId}</td>
                    <td>{postOffice.branchName}</td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeReport;

/*
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

    <div className="dashboard-container">
      <h2>Employee Login Report</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Activity ID</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Login Time</th>
            <th>Branch ID</th>
          </tr>
        </thead>
        <tbody>
          {reportData ? (
            <>
            {reportData.employees.map((employee, index) => {
              <EmployeeInfo key={index} employee={employee} />
            })}
            </>
          ) : (
            <>
            </>
          )}
        </tbody>
      </table>
    </div>


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

export default EmployeeReport;*/