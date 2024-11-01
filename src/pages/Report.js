import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const DailyReport = () => (
  <div className="report-content">
    <h2>Daily Report</h2>
    <p>Details about the daily report will go here.</p>
  </div>
);

const MonthlyReport = () => (
  <div className="report-content">
    <h2>Monthly Report</h2>
    <p>Details about the monthly report will go here.</p>
  </div>
);

const Report = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const handleDailyReport = () => setSelectedReport('daily');
  const handleMonthlyReport = () => setSelectedReport('monthly');

  return (
    <>
      <NavBar />
      <div className="report-container">
        <h1>Reports</h1>
        <p>Select the type of report to view:</p>
        <div className="report-options">
          <button onClick={handleDailyReport}>Daily Report</button>
          <button onClick={handleMonthlyReport}>Monthly Report</button>
        </div>
        {selectedReport === 'daily' && <DailyReport />}
        {selectedReport === 'monthly' && <MonthlyReport />}
      </div>
      <Footer />
    </>
  );
};

export default Report;
