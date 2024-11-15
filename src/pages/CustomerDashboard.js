import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import LogOut from "../components/Logout";
import Modal from "react-modal";
import "../css/CustomerDashboard.css";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const CustomerDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [recentShipments, setRecentShipments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleViewAllShipments = () => {
    window.location.href = "/tracking";
  };

  const handleViewSupport = () => {
    window.location.href = "/contact";
  };

  const handleViewProfile = () => {
    window.location.href = "/customer-profile";
  };

  const openDeleteModal = () => {
    setModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setModalIsOpen(false);
  };

  const handleDeleteProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("No access token found, please log in.");
      return;
    }

    try {
      const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          authentication: accessToken,
        },
      });

      // Send the DELETE request with the access token
      const response = await instance.patch(ENDPOINTS.AUTH.CUSTOMER.DELETE_PROFILE);
      
      // Clear the access token and redirect to login
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Error deleting the account:", error);
      alert("Failed to delete the account. Please try again.");
    }

    closeDeleteModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        window.location.href = "/login";
        return;
      }

      try {
        const instance = axios.create({
          baseURL: BASE_URL,
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            authentication: accessToken,
          },
        });

        const profileResponse = await instance.get(ENDPOINTS.GET.CUSTOMER.PROFILE);
        const shipmentsResponse = await instance.get(ENDPOINTS.GET.CUSTOMER.TRACKING);

        console.log(profileResponse.data);
        console.log(shipmentsResponse.data);

        const profile = profileResponse.data;

        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setEmail(profile.email);
        setStreet(profile.address.street);
        setCity(profile.address.city);
        setState(profile.address.state);
        setZip(profile.address.zipCode);
        setPhoneNumber(profile.phoneNumber);
        setRecentShipments(shipmentsResponse.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        alert("Failed to load customer data. Please try again.");
      }
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

        <div className="recent-shipments">
          <h3>Recent Shipments</h3>
          <div className="shipment-list">
            {recentShipments.length > 0 ? (
              recentShipments.map((shipment, index) => (
                <div key={index} className="shipment-item">
                  <p>
                    <strong>Status:</strong>{" "}
                    {shipment.trackingHistory?.[shipment.trackingHistory.length - 1]?.status || "N/A"}
                  </p>
                  <p>
                    <strong>Delivery Address:</strong>{" "}
                    {shipment.recepientAddress?.street || "N/A"}, {shipment.recepientAddress?.city || "N/A"},{" "}
                    {shipment.recepientAddress?.state || "N/A"} {shipment.recepientAddress?.zipcode || "N/A"}
                  </p>
                  <p>
                    <strong>Estimated Delivery:</strong> {shipment.packageInfo?.deliveryDate || "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p>No recent shipments.</p>
            )}
            <button className="view-all" onClick={handleViewAllShipments}>
              View Detailed Shipment Information
            </button>
          </div>
        </div>

        <div className="profile-info">
          <h3>Your Profile</h3>
          <p>
            <strong>Full Name:</strong> {firstName} {lastName}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone Number:</strong> {phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {street}, {city} {state}, {zip}
          </p>
          <button className="view-all" onClick={handleViewProfile}>
            Edit Profile
          </button>
          <button className="delete-profile-btn" onClick={openDeleteModal}>
            Delete Profile
          </button>
        </div>

        <div className="support-section">
          <h3>Need Help?</h3>
          <button className="contact-support" onClick={handleViewSupport}>
            Contact Support
          </button>
        </div>

        <div className="logout">
          <LogOut />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Account Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Delete Account</h2>
        <p>Are you sure you want to delete your account? This action cannot be reversed.</p>
        <button className="confirm-delete-btn" onClick={handleDeleteProfile}>
          Yes, Delete My Account
        </button>
        <button onClick={closeDeleteModal}>No, Keep My Account</button>
      </Modal>

      <Footer />
    </>
  );
};

export default CustomerDashboard;
