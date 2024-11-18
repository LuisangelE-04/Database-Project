import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../endpoints/Endpoints";

const TrackingReport = () => {
  const [reportData, setReportData] = useState([]);
  const [postOffice, setPostOffice] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportDataCopy, setReportDataCopy] = useState([]);
  const [filterValue, setFilterValue] = useState("status");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

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
      setReportDataCopy(response.data.packages);
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
    setDateRange({ startDate: "", endDate: "" });
  };

  const handleInputChange = (event) => {
    const val = event.target.value?.trim();
    setSearchTerm(val);
    if (!val) {
      setReportData(reportDataCopy);
      return;
    }

    if (filterValue === "status") {
      setReportData(() =>
        reportDataCopy
          .map((entry) => {
            entry = { ...entry };
            entry.trackingHistory = entry.trackingHistory.filter((v) =>
              v.status.toLowerCase().includes(val.toLowerCase())
            );
            return entry.trackingHistory.length > 0 ? entry : false;
          })
          .filter(Boolean)
      );
    } else if (filterValue === "location") {
      setReportData(() =>
        reportDataCopy
          .map((entry) => {
            entry = { ...entry };
            entry.trackingHistory = entry.trackingHistory.filter((v) =>
              v.location.toLowerCase().includes(val.toLowerCase())
            );
            return entry.trackingHistory.length > 0 ? entry : false;
          })
          .filter(Boolean)
      );
    } else if (filterValue === "packageId") {
      setReportData(() =>
        reportDataCopy.filter((entry) =>
          entry.packageInfo.packageId.toString().includes(val)
        )
      );
    }
  };

  const handleDateRangeChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateRangeFilter = () => {
    const { startDate, endDate } = dateRange;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      setReportData(() =>
        reportDataCopy.filter((entry) => {
          const deliveryDate = new Date(entry.packageInfo.deliveryDate);
          return deliveryDate >= start && deliveryDate <= end;
        })
      );
    }
  };

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="dashboard-container">
        <h2>Package Tracking Report</h2>
        <div className="filter-wrapper">
          <div className="filter-container">
            <label>Filter by</label>
            <select value={filterValue} onChange={handleFilterChange}>
              <option value="status">Status</option>
              <option value="location">Location</option>
              <option value="packageId">Package ID</option>
              <option value="deliveryDate">Delivery Date</option>
            </select>
            {filterValue === "deliveryDate" ? (
              <>
                <div className="date-filter-container">
                  <label>From</label>
                  <input
                    type="date"
                    name="startDate"
                    value={dateRange.startDate}
                    onChange={handleDateRangeChange}
                    placeholder="Start Date"
                  />
                </div>
                <div className="date-filter-container">
                  <label>To</label>
                  <input
                    type="date"
                    name="endDate"
                    value={dateRange.endDate}
                    onChange={handleDateRangeChange}
                    placeholder="End Date"
                  />
                </div>
                <button onClick={handleDateRangeFilter} className="apply-filter-button">Apply Date Filter</button>
              </>
            ) : (
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Enter search term..."
              />
            )}
          </div>
        </div>
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
                  <tr key={p.packageId + v.date}>
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