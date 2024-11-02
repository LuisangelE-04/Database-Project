import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Card, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { getCustomerData } from '../endpoints/CustomerApi'; 

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const data = await getCustomerData(token);
        setCustomerData(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        navigate('/login'); // Redirect to login on error
      }
    };

    fetchData();
  }, [navigate]);

  if (!customerData) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <NavBar />
      <Container>
        <h1>Customer Dashboard</h1>
        <div className="dashboard-container">
          <Card>
            <Card.Body>
              <Card.Title>Welcome, {customerData.name}</Card.Title>
              <Card.Text>Email: {customerData.email}</Card.Text>
              <Button variant="primary">Edit Profile</Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default CustomerDashboard;
