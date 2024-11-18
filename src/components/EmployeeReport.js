import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";
import "../css/Report.css";

const EmployeeReport = () => {
  const [reportData, setReportData] = useState([]);
  const [reportDataCopy, setReportDataCopy] = useState([]);
  const [postOffice, setPostOffice] = useState({});
  const [filterValue, setFilterValue] = useState("employee-id");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState({ day: "", startTime: "", endTime: "" });
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
      setReportDataCopy(response.data.employees);
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

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setReportData(reportDataCopy);
    setSearchTerm("");
    setDateFilter({ day: "", startTime: "", endTime: "" });
  };

  const handleInputChange = (event) => {
    const val = event.target.value?.trim();
    setSearchTerm(val);
    if (!val) {
      setReportData(reportDataCopy);
      return;
    }
    if (filterValue === "employee-id") {
      setReportData(() =>
        reportDataCopy.filter((entry) =>
          entry.recentLogins[0]?.employeeId?.toString().includes(val)
        )
      );
    } else if (filterValue === "branch-id") {
      setReportData(() =>
        reportDataCopy.filter((entry) =>
          entry.recentLogins[0]?.branchId?.toString().includes(val)
        )
      );
    }
  };

  const handleDateFilterChange = (event) => {
    const { name, value } = event.target;
    setDateFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateFilterApply = () => {
    const { day, startTime, endTime } = dateFilter;

    if (day && startTime && endTime) {
      const startDateTime = new Date(`${day}T${startTime}`);
      const endDateTime = new Date(`${day}T${endTime}`);

      setReportData(() =>
        reportDataCopy.filter((entry) =>
          entry.recentLogins.some((login) => {
            const loginDateTime = new Date(login.loginTime);
            return loginDateTime >= startDateTime && loginDateTime <= endDateTime;
          })
        )
      );
    }
  };

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Employee Login Report</h2>
      <div className="filter-wrapper">
        <div className="filter-container">
          <label>Filter by</label>
          <select value={filterValue} onChange={handleFilterChange}>
            <option value="employee-id">Employee ID</option>
            <option value="branch-id">Branch ID</option>
            <option value="login-time">Login Time</option>
          </select>

          {filterValue === "login-time" ? (
            <>
              <div className="date-filter-container">
                <label>Date</label>
                <input
                  type="date"
                  name="day"
                  value={dateFilter.day}
                  onChange={handleDateFilterChange}
                  placeholder="Select Day"
                />
              </div>
              <div className="date-filter-container">
                <label>From</label>
                <input
                  type="time"
                  name="startTime"
                  value={dateFilter.startTime}
                  onChange={handleDateFilterChange}
                  placeholder="Start Time"
                />
              </div>
              <div className="date-filter-container">
                <label>To</label>
                <input
                  type="time"
                  name="endTime"
                  value={dateFilter.endTime}
                  onChange={handleDateFilterChange}
                  placeholder="End Time"
                />
              </div>
              <button onClick={handleDateFilterApply}>Apply Date Filter</button>
            </>
          ) : (
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="enter search term..."
            />
          )}
        </div>
      </div>

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
                    {entry.employeeInfo.firstName} {entry.employeeInfo.lastName}
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
  );
};

export default EmployeeReport;
