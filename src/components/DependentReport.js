import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const DependentReport = () => {
  const [reportData, setReportData] = useState([]);
  const [reportDataCopy, setReportDataCopy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterValue, setFilterValue] = useState("employee-id");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDependentReport = async () => {
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
        `${BASE_URL}${ENDPOINTS.AUTH.MANAGER.DEPENDENT_REPORT}`
      );
      console.log(response.data);
      setReportData(response.data);
      setReportDataCopy(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch employee report.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDependentReport();
  }, []);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setReportData(reportDataCopy);
    setSearchTerm("");
  };

  const handleInputChange = (event) => {
    const val = event.target.value?.trim();
    setSearchTerm(event.target.value);
    if (!val) {
      setReportData(reportDataCopy);
      return;
    }
    if (filterValue === "employee-id") {
      setReportData(() => {
        return reportDataCopy.filter((entry) =>
          entry.employeeInfo.employeeId.toString().includes(val)
        );
      });
    } else {
      setReportData(() => {
        return reportDataCopy.filter((entry) => {
          const name =
            entry.employeeInfo.firstName + " " + entry.employeeInfo.lastName;
          return name.toLowerCase().includes(val.toLowerCase());
        });
      });
    }
  };

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Employee Dependent Report</h2>
      <div className="filter-wrapper">
        <div className="filter-container">
          <label>Filter by</label>
          <select value={filterValue} onChange={handleFilterChange}>
            <option value="employee-id">Employee ID</option>
            <option value="employee-name">Employee Name</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="enter search term..."
          />
        </div>
      </div>
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
          {reportData.map((entry) => {
            return entry.dependents.map((v) => {
              return (
                <tr key={entry.employeeInfo.employeeId + v.dependentId}>
                  <td>{entry.employeeInfo.employeeId}</td>
                  <td>
                    {entry.employeeInfo.firstName} {entry.employeeInfo.lastName}
                  </td>
                  <td>{entry.employeeInfo.phoneNumber}</td>
                  <td>{v.dependentId}</td>
                  <td>
                    {v.firstName} {v.lastName}
                  </td>
                  <td>{v.relationship}</td>
                  <td>{v.dateOfBirth}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DependentReport;
