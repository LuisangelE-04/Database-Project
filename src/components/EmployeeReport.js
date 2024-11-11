import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, BASE_URL } from '../endpoints/Endpoints';

const EmployeeReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployeeReport = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/${ENDPOINTS.AUTH.MANAGER.EMPLOYEE_REPORT}`);
      setReportData(response.data);
    } catch (err) {
      setError('Failed to fetch employee report.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeReport();
  }, []);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Employee Login Report</h2>
      <table>
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
          {reportData.map((entry) => (
            <tr key={entry.activityId}>
              <td>{entry.activityId}</td>
              <td>{entry.employeeId}</td>
              <td>{entry.employee?.name}</td>
              <td>{new Date(entry.loginTime).toLocaleString()}</td>
              <td>{entry.branchId}</td>
              <td>{entry.postOffice?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeReport;