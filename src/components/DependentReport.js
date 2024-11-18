import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";
import "../css/Report.css";

const DependentReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDependentReport = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        window.location.href = "/";
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
        `${BASE_URL}${ENDPOINTS.AUTH.MANAGER.DEPENDENT_REPORT}`
      );

      console.log(response.data);
      setReportData(response.data);
      setLoading(false);
      
    } catch (error) {
      setError("Failed to fetch employee report.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDependentReport();
  }, []);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <>
      <div className="dashboard-container">
        <h2>Employee Dependent Report</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Phone Number</th>
              <th>Dependent ID</th>
              <th>Dependent Name</th>
              <th>Dependent Relationship</th>
              <th>Dependent DOB</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((data) => {
              return data.dependents.map((entry) => {
                return (
                  <tr key={data.employeeInfo.employeeId}>
                    <td>{data.employeeInfo.employeeId}</td>
                    <td>{data.employeeInfo.firstName} {data.employeeInfo.lastName}</td>
                    <td>{data.employeeInfo.phoneNumber}</td>
                    <td>{entry.dependentId}</td>
                    <td>{entry.firstName} {entry.lastName}</td>
                    <td>{entry.relationship}</td>
                    <td>{entry.dateOfBirth}</td>
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

export default DependentReport;