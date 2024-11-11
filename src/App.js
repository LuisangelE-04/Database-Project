import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./endpoints/AuthContext";
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Tracking from './pages/Tracking';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeRegister from './pages/EmployeeRegister';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Reports from './pages/Reports';
import NavBar from "./components/NavBar";
import CreatePackage from "./components/CreatePackage";
import UpdatePackage from "./pages/UpdatePackage";
import EmployeeReport from "./pages/EmployeeReport";

function App() {
  return (
    <AuthProvider>
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
        <Route path="/reports" element={<Reports />} />
        <Route path="/manager-dashboard" element={<AdminDashboard />} />
        <Route path="/create-package" element={<CreatePackage />} />
        <Route path="/update-package" element={<UpdatePackage />} />
        <Route path="/employee-report" element={<EmployeeReport />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
