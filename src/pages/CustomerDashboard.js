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
  const [notificationsModalIsOpen, setNotificationsModalIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
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
        console.log(profileResponse.data);

        setFirstName(profileResponse.data.firstName);
        setLastName(profileResponse.data.lastName);
        setEmail(profileResponse.data.email);
        setStreet(profileResponse.data.address.street);
        setCity(profileResponse.data.address.city);
        setState(profileResponse.data.address.state);
        setZip(profileResponse.data.address.zip);
        setPhoneNumber(profileResponse.data.phoneNumber);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchShipments = async () => {
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

        const shipmentsResponse = await instance.get(ENDPOINTS.GET.CUSTOMER.TRACKING);
        console.log(shipmentsResponse.data);

        setRecentShipments(shipmentsResponse.data);
      } catch (error) {
        console.error("Error fetching shipments data:", error);
      }
    };

    const fetchNotifications = async () => {
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

        const notificationsResponse = await instance.get(ENDPOINTS.GET.CUSTOMER.NOTIFICATIONS);
        console.log(notificationsResponse.data);

        setNotifications(notificationsResponse.data);
        setNotificationCount(notificationsResponse.data.length);
      } catch (error) {
        console.error("Error fetching notifications data:", error);
      }
    };

    fetchProfile();
    fetchShipments();
    fetchNotifications();
  }, []);

  const openNotificationsModal = () => {
    setNotificationsModalIsOpen(true);
    setNotificationCount(0); // Reset notification count when modal is opened
  };

  const closeNotificationsModal = () => {
    setNotificationsModalIsOpen(false);
  };

  const handleDeleteProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("You must be logged in to delete your profile.");
      window.location.href = "/login";
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

  const openDeleteModal = () => {
    setModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setModalIsOpen(false);
  }

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <header>
          <h1>Welcome back, {firstName}!</h1>
          <button className="notifications-button" onClick={openNotificationsModal}>
            Notifications
            {notificationCount > 0 && (
              <span className={`notification-count ${notificationCount > 0 ? "active" : ""}`}>
                ({notificationCount})
              </span>
            )}
          </button>
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
            <button className="view-all" onClick={() => window.location.href = "/tracking"}>
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
            <strong>Phone Number:</strong> {phoneNumber || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {street}, {city} {state}, {zip}
          </p>
          <button className="view-all" onClick={() => window.location.href = "/customer-profile"}>
            Edit Profile
          </button>
          <button className="delete-profile-btn" onClick={openDeleteModal}>
            Delete Profile
          </button>
        </div>

        <div className="support-section">
          <h3>Need Help?</h3>
          <button className="contact-support" onClick={() => window.location.href = "/contact"}>
            Contact Support
          </button>
        </div>

        <div className="logout">
          <LogOut />
        </div>
      </div>

      {/* Notifications Modal */}
      <Modal
        isOpen={notificationsModalIsOpen}
        onRequestClose={closeNotificationsModal}
        contentLabel="Notifications"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Notifications</h2>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <p><strong>Message:</strong> {notification.message}</p>
              <p><strong>Package ID:</strong> {notification.packageId}</p>
              <p><strong>Date:</strong> {notification.createdAt}</p>
            </div>
          ))
        ) : (
          <p>No new notifications.</p>
        )}
        <button className="modal-button" onClick={() => window.location.href = "/contact"}>Contact Us</button>
        <button onClick={closeNotificationsModal}>Close</button>
      </Modal>

            <Modal
        isOpen={notificationsModalIsOpen}
        onRequestClose={closeNotificationsModal}
        contentLabel="Notifications"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Notifications</h2>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <p><strong>Message:</strong> {notification.message}</p>
              <p><strong>Package ID:</strong> {notification.packageId}</p>
              <p><strong>Date:</strong> {notification.createdAt}</p>
            </div>
          ))
        ) : (
          <p>No new notifications.</p>
        )}
        <button className="modal-button" onClick={() => window.location.href = "/contact"}>Contact Us</button>
        <button className="modal-button" onClick={closeNotificationsModal}>Close</button>
      </Modal>

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
