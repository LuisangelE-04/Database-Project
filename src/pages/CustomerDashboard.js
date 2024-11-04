import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import '../css/CustomerDashboard.css'; // Adjust the path as needed

const CustomerDashboard = () => {
  const handleDeleteAccount = () => {
    // Logic for account deletion (e.g., API call)
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Your account has been deleted.");
      // Add API call to delete the account here
    }
  };

  return (
    <>
      <NavBar />
      <Container className="dashboard-container mt-4">
        <h1 className="dashboard-title">Customer Dashboard</h1>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Welcome back, [Customer Name]!</Card.Title>
          </Card.Body>
        </Card>

        <Row className="mb-4">
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Quick Actions</Card.Title>
                <Button variant="primary" className="w-100 mb-2">Create a Shipment</Button>
                <Button variant="secondary" className="w-100 mb-2">Track a Package</Button>
                <Button variant="info" className="w-100 mb-2">Schedule a Pickup</Button>
                <Button variant="success" className="w-100">Manage Address Book</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Shipment Overview</Card.Title>
                <Row>
                  <Col><h4>Active Shipments: 5</h4></Col>
                  <Col><h4>Completed Shipments: 20</h4></Col>
                  <Col><h4>Pending Pickups: 2</h4></Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>Recent Shipments</Card.Title>
                <ul>
                  <li>Shipment ID: 12345 - Status: In Transit - Estimated Delivery: Nov 5</li>
                  <li>Shipment ID: 67890 - Status: Delivered - Date: Nov 1</li>
                </ul>
                <Button variant="link">View All Shipments</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            <Card.Title>Account Settings</Card.Title>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
            <p className="mt-2 text-danger">
              Warning: This action cannot be undone. All your data will be permanently removed.
            </p>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Support</Card.Title>
            <p>If you need help, please check our <a href="/support">Support Center</a>.</p>
            <Button variant="link">Contact Support</Button>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default CustomerDashboard;
