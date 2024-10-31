import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";


const CustomerDashboard = () => {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Customer Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>
                View and update your profile information.
              </Card.Text>
              <Button variant="primary">Go to Profile</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <Card.Text>
                View your order history and track current orders.
              </Card.Text>
              <Button variant="primary">View Orders</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Support</Card.Title>
              <Card.Text>
                Contact support for any issues or questions.
              </Card.Text>
              <Button variant
              ="primary">Contact Support</Button>
                    </Card.Body>
                    </Card>
                  </Col>
                  </Row>
                </Container>
                );
              };

              export default CustomerDashboard;