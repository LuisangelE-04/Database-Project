import React, { useState } from "react";
import EmployeeReport from "../components/EmployeeReport";
import TrackingReport from "../components/TrackingReport";
import DependentReport from "../components/DependentReport";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CreatePackage from "../components/CreatePackage";
import UpdatePackage from "../components/UpdatePackage";
import Modal from "react-modal";
import "../css/AdminReports.css";

const AdminReports = () => {
  const [currentReport, setCurrentReport] = useState("employee");
  const [isCreatePackageModalOpen, setCreatePackageModalOpen] = useState(false);
  const [isUpdatePackageModalOpen, setUpdatePackageModalOpen] = useState(false);
  const branchId = 1;

  const handleSwitchToEmployeeReport = () => {
    setCurrentReport("employee");
  };

  const handleSwitchToTrackingReport = () => {
    setCurrentReport("tracking");
  };

  const handleSwitchToDependentReport = () => {
    setCurrentReport("dependent");
  };

  const openCreatePackageModal = () => {
    setCreatePackageModalOpen(true);
  };

  const closeCreatePackageModal = () => {
    setCreatePackageModalOpen(false);
  };

  const openUpdatePackageModal = () => {
    setUpdatePackageModalOpen(true);
  };

  const closeUpdatePackageModal = () => {
    setUpdatePackageModalOpen(false);
  };

  return (
    <>
      <NavBar />
      <div className="report-container">
        <div className="reports-container">
          <div className="report-buttons">
            <button
              className={`report-btn ${currentReport === "employee" ? "active" : ""}`}
              onClick={handleSwitchToEmployeeReport}
            >
              Employee Report
            </button>
            <button
              className={`report-btn ${currentReport === "tracking" ? "active" : ""}`}
              onClick={handleSwitchToTrackingReport}
            >
              Tracking Report
            </button>
            <button
              className={`report-btn ${currentReport === "dependent" ? "active" : ""}`}
              onClick={handleSwitchToDependentReport}
            >
              Dependent Report
            </button>
          </div>
          <div className="report-content">
            {currentReport === "employee" && <EmployeeReport branchId={branchId} />}
            {currentReport === "tracking" && <TrackingReport branchId={branchId} />}
            {currentReport === "dependent" && <DependentReport branchId={branchId} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminReports;