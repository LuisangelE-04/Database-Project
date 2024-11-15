import React from "react";
import EmployeeReport from "../components/EmployeeReport";
import TrackingReport from "../components/TrackingReport";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AdminReports = () => {
  const [currentReport, setCurrentReport] = React.useState("employee");
  const branchId = 1;

  const handleSwitchToEmployeeReport = (report) => {
    setCurrentReport("employee");
  };

  const handleSwitchToTrackingReport = (report) => {
    setCurrentReport("tracking");
  };

  return (
    <>
    <NavBar />
    <div className="report-container">
      <button onClick={handleSwitchToEmployeeReport}>Employee Report</button>
      <button onClick={handleSwitchToTrackingReport}>Tracking Report</button>
      <div>
        {currentReport === "employee" ? (
          <EmployeeReport branchId={branchId} />
        ) : (
          <TrackingReport branchId={branchId} />
        )}
      </div>
    </div>
    <Footer />
    </>
  )
};

export default AdminReports;