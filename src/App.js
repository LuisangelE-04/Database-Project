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
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/employeelogin" element={<EmployeeLogin />} />
      <Route path="/employeeregister" element={<EmployeeRegister />} />
      <Route path="/employeedashboard" element={<EmployeeDashboard />} />
      <Route path="/customerdashboard" element={<CustomerDashboard />} />
    </Routes>
  );
}

export default App;