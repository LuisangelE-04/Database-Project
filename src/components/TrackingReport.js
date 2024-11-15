import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../endpoints/Endpoints";

const TrackingReport = () => {
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
        `${BASE_URL}${ENDPOINTS.AUTH.MANAGER.TRACKING_REPORT}`
      );
      console.log(response.data);
      setReportData(response.data.packages);
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
        <h2>Package Tracking Report</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Package ID</th>
              <th>Shipping Date</th>
              <th>Delivery Date</th>
              <th>Amount</th>
              <th>Weight</th>
              <th>Post Office Branch</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((entry) => {
              const p = entry.packageInfo;
              return entry.trackingHistory.map((v) => {
                return (
                  <tr key={p.packageId}>
                    <td>{p.packageId}</td>
                    <td>{new Date(p.shippingDate).toLocaleDateString()}</td>
                    <td>{new Date(p.deliveryDate).toLocaleDateString()}</td>
                    <td>{p.amount}</td>
                    <td>{p.weight}</td>
                    <td>{postOffice.branchName}</td>
                    <td>{v.status}</td>
                    <td>{v.location}</td>
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

export default TrackingReport;
