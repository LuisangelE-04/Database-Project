import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logout from "../components/Logout";
import AddDependent from "../components/AddDependent";
import UpdatePackage from "../components/UpdatePackage";
import CreatePackage from "../components/CreatePackage";
import Modal from 'react-modal';
import "../css/Dashboard.css";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const EmployeeDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [postOfficeNumber, setPostOfficeNumber] = useState("");
  const [postOfficeEmail, setPostOfficeEmail] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [notificationsModalIsOpen, setNotificationsModalIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [resolvedNotifications, setResolvedNotifications] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        window.location.href = "/employee-login";
        return;
      }

      const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          authentication: accessToken
        },
      });

      try {
        const response = await instance.get(ENDPOINTS.GET.EMPLOYEE.PROFILE);
        console.log(response.data);

        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPosition(response.data.position);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setEmployeeId(response.data.employeeId);
        setPostOffice(response.data.postOffice.branchName);
        setPostOfficeNumber(response.data.postOffice.phoneNumber);
        setPostOfficeEmail(response.data.postOffice.email);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchNotifications = async () => {
      const accessToken = localStorage.getItem("accessToken");
    
      if (!accessToken) {
        window.location.href = "/employee-login";
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
        console.log(accessToken);
        const notificationsResponse = await instance.get(ENDPOINTS.GET.EMPLOYEE.NEED_EMPLOYEE_ACTION);
        console.log("Notifications Response:", notificationsResponse.data); // Log the data being fetched
    
        setNotifications(notificationsResponse.data);
        setNotificationCount(notificationsResponse.data.length);
      } catch (error) {
        console.error("Error fetching notifications data:", error);
      }
    };
    
    fetchData();
    fetchNotifications();
  }, []);

  const handleCreatePackage = () => {
    setModalContent(<CreatePackage />);
    setModalIsOpen(true);
  }

  const handleUpdatePackage = () => {
    setModalContent(<UpdatePackage />);
    setModalIsOpen(true);
  }

  const handleViewProfile = () => {
    navigate('/employee-profile');
  }

  const handleAddDependent = () => {
    setModalContent(<AddDependent />);
    setModalIsOpen(true);
  }

  const handleNeedAttention = () => {
    setNotificationsModalIsOpen(true);
    setNotificationCount(0); // Reset notification count when modal is opened
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const closeNotificationsModal = () => {
    setNotificationsModalIsOpen(false);
  }

  const handleResolveChange = (index) => {
    setResolvedNotifications((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  return (
    <>
      <NavBar />
      <div>
        <div className="branch-info">
          <header>
            <h1>{postOffice}</h1>
            <h3>Contact Your Post Office</h3>
            <p><strong>Phone: </strong>{postOfficeNumber} <strong>Email: </strong>{postOfficeEmail}</p>
          </header>
        </div>
        <header>
          <h1>Hello, {firstName}! | {position}</h1>
        </header>

        <div className="dashboard-container">
          <div className="profile-info">
            <header>
              <h3>Account Information</h3>
            </header>
            <p><strong>Full Name: </strong>{firstName} {lastname}</p>
            <p><strong>Position: </strong>{position}</p>
            <p><strong>Your Email:  </strong>{email}</p>
            <p><strong>Phone: </strong>{phoneNumber}</p>
            <p><strong>Employee ID: </strong>{employeeId}</p>
            <button className="view-all" onClick={handleViewProfile}>Edit Profile</button>
          </div>

          <div className="quick-actions">
            <header>
              <h3>Quick Actions</h3>
            </header>
            <div className="dashboard-grid">
              <div className="item-1">
                <button onClick={handleUpdatePackage}>Update Package</button>
              </div>
              <div className="item-2">
                <button onClick={handleCreatePackage}>Create Package</button>
              </div>
              <div className="item-3">
                <button onClick={handleAddDependent}>Add Dependent</button>
              </div>
              <div className="item-4">
                <button onClick={handleNeedAttention}>Customer Requests
                  {notificationCount > 0 && (
                    <span className={`notification-count ${notificationCount > 0 ? "active" : ""}`}>
                      ({notificationCount})
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="logout">
            <Logout />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="modal"
        overlayClassName="overlay"
        style={{ content: { maxHeight: '80vh', overflowY: 'auto' }}} // Add scroll styling to modal
      >
        {modalContent}
        <button onClick={closeModal}>Close</button>
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
              <div className="notification-content">
                <p><strong>Message:</strong> {notification.messages}</p>
                <p><strong>Package ID:</strong> {notification.packageId}</p>
              </div>
              <input
                type="checkbox"
                className="notification-checkbox"
                checked={resolvedNotifications[index] || false}
                onChange={() => handleResolveChange(index)}
              />
              {resolvedNotifications[index] && <span className="resolved-text"> Noted</span>}
            </div>
          ))
        ) : (
          <p>No new notifications.</p>
        )}
        <button className="modal-button" onClick={closeNotificationsModal}>Close</button>
      </Modal>

      <Footer />
    </>
  );
};

export default EmployeeDashboard;
