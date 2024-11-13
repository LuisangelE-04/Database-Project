import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import LogOut from "../components/Logout";
import "../css/CustomerDashboard.css"; // Reuse the CSS from CustomerDashboard
import { createENDPOINT, ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const AdminDashboard = () => {
  const [firstName, setFirstName] = useState("Admin");
  const [lastName, setLastName] = useState("User");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [recentActivities, setRecentActivities] = useState([]);

  // Handlers for navigation or actions
  const handleManageUsers = () => {
    window.location.href = "/manage-users";
  };

  const handleAllReports = () => {
    window.location.href = "/reports";
  };

  const handleRegisterEmployee = () => {
    window.location.href = "/employee-register";
  };

  const handleRegisterAdmin = () => {
    window.location.href = "/register-admin";
  };

  const handleCreateBranch = () => {
    window.location.href = "/create-branch";
  };

  const handleSubmitSupplyShipment = () => {
    // Navigate to the page or implement API call for submitting a new shipment
    window.location.href = "/submit-supply-shipment";
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        window.location.href = "/login";
        return;
      }

      const profile = axios.create({
        baseURL: BASE_URL,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          authentication: accessToken
        },
      });

      const response = await profile.get(ENDPOINTS.GET.EMPLOYEE.PROFILE); // Replace with the correct endpoint

      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setPhoneNumber(response.data.phoneNumber);
      setAddress(response.data.address);
      // Uncomment and update the line below to fetch recent activities if needed
      // const response2 = await profile.get(ENDPOINTS.GET.EMPLOYEE.RECENT_ACTIVITIES);
      // setRecentActivities(response2.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <header>
          <h1>Welcome back, {firstName}!</h1>
        </header>

        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <div className="activity-list">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <p><strong>Activity:</strong> {activity.description || "N/A"}</p>
                  <p><strong>Date:</strong> {activity.date || "N/A"}</p>
                </div>
              ))
            ) : (
              <p>No recent activities.</p>
            )}
            <button className="view-all" onClick={handleAllReports}>View All Reports</button>
          </div>
        </div>

        <div className="profile-info">
          <h3>Your Profile</h3>
          <p><strong>Full Name:</strong> {firstName} {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone Number:</strong> {phoneNumber}</p>
          <p><strong>Address:</strong> {address}</p>
          <button className="view-all" onClick={handleManageUsers}>Manage Users</button>
        </div>

        <div className="admin-actions">
          <h3>Admin Actions</h3>
          <div className="action-buttons">
            <button className="primary-action" onClick={handleRegisterEmployee}>Create/Register Employee</button>
            <button className="primary-action" onClick={handleRegisterAdmin}>Create/Register Admin</button>
            <button className="primary-action" onClick={handleCreateBranch}>Create New Branch</button>
            <button className="primary-action" onClick={handleSubmitSupplyShipment}>Submit Shipment for New Supplies</button>
          </div>
        </div>

        <div className="logout">
          <LogOut />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminDashboard;
