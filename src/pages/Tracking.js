import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Modal from 'react-modal';
import '../css/Tracking.css';
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const Tracking = () => {
  const [trackingInfo, setTrackingInfo] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [packageIdToCancel, setPackageIdToCancel] = useState(null);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTracking = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found. Redirecting to login.");
        navigate('/login');
        return;
      }

      try {
        const instance = axios.create({
          baseURL: BASE_URL,
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            authentication: accessToken
          },
        });

        const response = await instance.get(ENDPOINTS.GET.CUSTOMER.TRACKING);
        console.log(response.data);
        setTrackingInfo(response.data);
      } catch (error) {
        console.error("Error fetching tracking information:", error);
        alert("Error fetching tracking information. Please try again.");
      }
    };

    fetchTracking();
  }, [navigate]);

  const openCancelModal = (packageId) => {
    setPackageIdToCancel(packageId);
    setModalIsOpen(true);
  };

  const closeCancelModal = () => {
    setModalIsOpen(false);
    setPackageIdToCancel(null);
  };

  const openPaymentModal = (transaction) => {
    setSelectedTransaction(transaction);
    setPaymentModalIsOpen(true);
  };

  const closePaymentModal = () => {
    setPaymentModalIsOpen(false);
    setSelectedTransaction(null);
  };

  const handleCancelPackage = async () => {
    if (!packageIdToCancel) return;
  
    const accessToken = localStorage.getItem("accessToken");
  
    try {
      const body = {
        "packageId": packageIdToCancel,
      };
      const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          authentication: accessToken
        },
      });
  
      const response = await instance.patch(ENDPOINTS.GET.CUSTOMER.CANCEL_PACKAGE, body);
      alert(`Package ID ${packageIdToCancel} has been cancelled.`);
      setTrackingInfo(trackingInfo.filter(pkg => pkg.packageInfo.packageId !== packageIdToCancel));
      
      closeCancelModal();
    } catch (error) {
      console.error("Error cancelling the package:", error);
      alert("Failed to cancel the package. Please try again.");
    }
  };

  const handlePay = async () => {
    if (!selectedTransaction) return;

    const accessToken = localStorage.getItem("accessToken");

    try {
      const body = {
        "packageId": selectedTransaction.packageId
      };
      const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          authentication: accessToken
        },
      });

      const response = await instance.patch(ENDPOINTS.GET.CUSTOMER.MAKE_PAYMENT, body);
      if (response.data) {
        setPaymentSuccessMessage(`Payment completed successfully for Transaction ID: ${selectedTransaction.transactionId}`);
        // Update the tracking information with the new payment status
        setTrackingInfo(prevState =>
          prevState.map(pkg => {
            if (pkg.packageInfo.packageId === selectedTransaction.packageId) {
              return {
                ...pkg,
                transactionStatus: pkg.transactionStatus.map(transaction => ({
                  ...transaction,
                  status: transaction.status === 'unpaid' ? 'paid' : transaction.status
                }))
              };
            }
            return pkg;
          })
        );
      }
      closePaymentModal();
    } catch (error) {
      console.error("Error making the payment:", error);
      alert("Failed to make the payment. Please try again.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className='tracking-container'>
        <h2>Package History</h2>
        <div className='tracking-table'>
          {trackingInfo.map((item, index) => (
            <div key={index} className='tracking-row'>
              <div className='tracking-column'>
                <h3>Package Info</h3>
                <p><strong>Package ID:</strong> {item.packageInfo?.packageId || 'N/A'}</p>
                <p><strong>Amount:</strong> {item.packageInfo?.amount || 'N/A'}</p>
                <p><strong>Shipping Method:</strong> {item.packageInfo?.shippingMethod || 'N/A'}</p>
                <p><strong>Shipping Date:</strong> {item.packageInfo?.shippingDate.split("T")[0] || 'N/A'}</p>
                <p><strong>Delivery Date:</strong> {item.packageInfo?.deliveryDate.split("T")[0] || 'N/A'}</p>
              </div>
              <div className='tracking-column'>
                <h3>Recipient Address</h3>
                <p><strong>Street:</strong> {item.recepientAddress?.street || 'N/A'}</p>
                <p><strong>City:</strong> {item.recepientAddress?.city || 'N/A'}</p>
                <p><strong>State:</strong> {item.recepientAddress?.state || 'N/A'}</p>
                <p><strong>Zipcode:</strong> {item.recepientAddress?.zipcode || 'N/A'}</p>
              </div>
              <div className='tracking-column'>
                <h3>Sender Address</h3>
                <p><strong>Street:</strong> {item.senderAddress?.street || 'N/A'}</p>
                <p><strong>City:</strong> {item.senderAddress?.city || 'N/A'}</p>
                <p><strong>State:</strong> {item.senderAddress?.state || 'N/A'}</p>
                <p><strong>Zipcode:</strong> {item.senderAddress?.zipcode || 'N/A'}</p>
              </div>
              <div className='tracking-column'>
                <h3>Tracking History</h3>
                {item.trackingHistory.map((history, i) => (
                  <div key={i}>
                    <p><strong>Status:</strong> {history.status}</p>
                    <p><strong>Date:</strong> {history.date}</p>
                    <p><strong>Location:</strong> {history.location}</p>
                  </div>
                ))}
              </div>
              <div className='tracking-column tracking-actions'>
                <h3>Payment Info</h3>
                {item.transactionStatus.map((transaction, i) => (
                  <div key={i}>
                    <p><strong>Amount:</strong> {transaction.amount}</p>
                    <p><strong>Date:</strong> {transaction.date}</p>
                    <p><strong>Status:</strong> {transaction.status}</p>
                    {transaction.status === 'unpaid' && (
                      <button
                        className="pay-btn"
                        onClick={() => openPaymentModal({ ...transaction, packageId: item.packageInfo.packageId })}
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                ))}
                <div className="button-container">
                  <button className="cancel-package-btn" onClick={() => openCancelModal(item.packageInfo?.packageId)}>
                    Cancel Package
                  </button>
                </div>
              </div>
            </div>
          ))}
          {trackingInfo.length === 0 && <p>No packages found.</p>}
        </div>
        {paymentSuccessMessage && (
          <p className="payment-success-message">{paymentSuccessMessage}</p>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeCancelModal}
        contentLabel="Cancel Package Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Cancel Package</h2>
        <p>Are you sure you want to cancel Package ID {packageIdToCancel}?</p>
        <button onClick={handleCancelPackage}>Yes, Cancel Package</button>
        <button onClick={closeCancelModal}>No, Keep Package</button>
      </Modal>
      <Modal
        isOpen={paymentModalIsOpen}
        onRequestClose={closePaymentModal}
        contentLabel="Payment Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Payment</h2>
        <p className="confirm-payment-text">
          Are you sure you want to pay <strong>{selectedTransaction?.amount}</strong> for Package ID <strong>{selectedTransaction?.packageId}</strong>?
        </p>
        <button className="confirm-payment-btn-green" onClick={handlePay}>Yes, Make Payment</button>
        <button className="confirm-payment-btn-red" onClick={closePaymentModal}>No, Cancel</button>
      </Modal>
      <Footer />
    </div>
  );
};

export default Tracking;
