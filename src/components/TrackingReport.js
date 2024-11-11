import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const TrackingReport = () => {
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrackingReport = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/${ENDPOINTS.AUTH.MANAGER.TRACKING_REPORT}`);
      setTrackingData(response.data);
    } catch (err) {
      setError("Failed to fetch tracking report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackingReport();
  }, []);

  if (loading) return <p>Loading Tracking Report...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Tracking Report</h2>
      <table>
        <thead>
          <tr>  
            <th>Package ID</th>
            <th>Weight</th>
            <th>Dimensions</th>
            <th>Shipping Date</th>
            <th>Delivery Date</th>
            <th>Status</th>
            <th>Last Updated Location</th>
          </tr>
        </thead>
        <tbody>
          {trackingData.map((tracking, index) => (
            <tr key={index}>
              <td>{tracking.packageId}</td>
              <td>{tracking.weight}</td>
              <td>{tracking.dimensions}</td>
              <td>{new Date(tracking.shippingDate).toLocaleDateString()}</td>
              <td>{tracking.deliveryDate ? new Date(tracking.deliveryDate).toLocaleDateString() : "Pending"}</td>
              <td>{tracking.status}</td>
              <td>{tracking.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackingReport;