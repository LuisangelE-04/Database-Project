import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import LogOut from "../components/Logout";
import EmployeeRegister from "../pages/EmployeeRegister";
import CreateBranch from "../components/CreateBranch"; // Import CreateBranch
import Modal from 'react-modal';
import "../css/CustomerDashboard.css";
import "../css/ModalStyles.css";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const AdminDashboard = () => {
  const [firstName, setFirstName] = useState("Admin");
  const [lastName, setLastName] = useState("User");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [position, setPosition] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const handleAllReports = () => {
    window.location.href = "/reports";
  };

  const handleRegisterEmployee = () => {
    setModalTitle("Employee Registration");
    setModalContent(<EmployeeRegister />);
    setModalIsOpen(true);
  };

  const handleViewProfile = () => {
    window.location.href = "/employee-profile";
  };

  // Updated function to open the CreateBranch form in the modal
  const handleCreateBranch = () => {
    setModalTitle("Create New Branch");
    setModalContent(<CreateBranch />);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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

      const response = await profile.get(ENDPOINTS.GET.EMPLOYEE.PROFILE);

      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setPhoneNumber(response.data.phoneNumber);
      setEmployeeId(response.data.employeeId);
      setPosition(response.data.position);
      setPostOffice(response.data.postOffice.branchName);
      console.log(response.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <header>
          <h1>Welcome back, {firstName}!</h1>
          <h2>{position} | {postOffice}</h2>
        </header>
        
        <div className="profile-info">
          <h3>Your Profile</h3>
          <p><strong>Full Name:</strong> {firstName} {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone Number:</strong> {phoneNumber}</p>
          <p><strong>ID:</strong> {employeeId}</p>
          <button className="view-all" onClick={handleViewProfile}>Edit Profile</button>
        </div>

        <div className="quick-actions">
          <header>
            <h3>Admin Actions</h3>
          </header>
          <div className="dashboard-grid">
            <div className="item-1">
              <button onClick={handleRegisterEmployee}>Register Employee</button>
            </div>
            <div className="item-2">
              <button onClick={handleAllReports}>View Reports</button>
            </div>
            <div className="item-3">
              <button onClick={handleCreateBranch}>Create New Branch</button>
            </div>
          </div>
        </div>

        <div className="logout">
          <LogOut />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="modal modal-scrollable"
        overlayClassName="overlay"
      >
        <h2>{modalTitle}</h2>
        {modalContent}
        <button onClick={closeModal} className="modal-button">Close</button>
      </Modal>

      <Footer />
    </>
  );
};

export default AdminDashboard;
