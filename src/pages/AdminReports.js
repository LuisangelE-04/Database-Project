import React, { useState } from "react";
import EmployeeReport from "../components/EmployeeReport";
import TrackingReport from "../components/TrackingReport";
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

  const Reports = () => {
    const [view, setView] = (event) => {
      setView(event.target.value);
    }
  }

  const handleSwitchToEmployeeReport = () => {
    setCurrentReport("employee");
  };

  const handleSwitchToTrackingReport = () => {
    setCurrentReport("tracking");
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
            <button className="report-btn" onClick={handleSwitchToEmployeeReport}>
              Employee Report
            </button>
            <button className="report-btn" onClick={handleSwitchToTrackingReport}>
              Tracking Report
            </button>
          </div>
          <div className={currentReport === "employee" ? "employee-report" : "tracking-report"}>
            {currentReport === "employee" ? (
              <EmployeeReport branchId={branchId} />
            ) : (
              <TrackingReport branchId={branchId} />
            )}
          </div>
        </div>
      </div>


      {/* Move this to another file */}
      <Modal
        isOpen={isCreatePackageModalOpen}
        onRequestClose={closeCreatePackageModal}
        contentLabel="Create Package"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Create Package</h2>
        <CreatePackage />
        <button onClick={closeCreatePackageModal}>Close</button>
      </Modal>
      <Modal
        isOpen={isUpdatePackageModalOpen}
        onRequestClose={closeUpdatePackageModal}
        contentLabel="Update Package"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Update Package</h2>
        <UpdatePackage />
        <button onClick={closeUpdatePackageModal}>Close</button>
      </Modal>
      <Footer />
    </>
  );
};

export default AdminReports;
