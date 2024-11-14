import React from "react";
import EmployeeReport from "../components/EmployeeReport";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AdminReports = () => {
  const branchId = 1;

  return (
    <>
    <NavBar />
    <div className="report-container">
      <EmployeeReport branchId={branchId} />
    </div>
    <Footer />
    </>
  )
};

export default AdminReports;