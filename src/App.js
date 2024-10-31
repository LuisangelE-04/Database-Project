import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Tracking from './pages/Tracking';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeRegister from './pages/EmployeeRegister';
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminLogin from './pages/AdminLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/employee-register" element={<EmployeeRegister />} />
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
}

export default App;