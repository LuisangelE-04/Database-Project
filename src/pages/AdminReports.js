import React from "react";
import EmployeeReport from "../components/EmployeeReport";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AdminReports = () => {

  return (
    <>
    <NavBar />
    <div className="report-container">
      <EmployeeReport />
    </div>
    <Footer />
    </>
  )
};

export default AdminReports;