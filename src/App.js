import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import UpdatePackage from './pages/UpdatePackage'
import UpdateProfile from './components/UpdateProfile';
import CreatePackage from './components/CreatePackage';  // Import CreatePackage component




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
        <Route path="/update-package" element={<UpdatePackage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/manager-dashboard" element={<AdminDashboard />} />
        <Route path="/employee/update-package" element={<UpdatePackage />} />
        <Route path="/employee/update-profile" element={<UpdateProfile />} />
        <Route path="/employee/create-package" element={<CreatePackage />} />  {/* Add CreatePackage route */}

        


      </Routes>
    </AuthProvider>
  );
}

export default App;
