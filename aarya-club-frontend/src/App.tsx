import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PublicEvents from './pages/PublicEvents';
import PublicMembers from './pages/PublicMembers';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminEvents from './pages/AdminEvents';
import AdminMembers from './pages/AdminMembers';
import Register from './pages/Register';
import TestAuth from './pages/TestAuth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes - Accessible to everyone */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="events" element={<PublicEvents />} />
          <Route path="members" element={<PublicMembers />} />
        </Route>

        {/* Hidden Admin Routes - Only accessible via secret URL */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="events" element={
            <ProtectedRoute>
              <AdminEvents />
            </ProtectedRoute>
          } />
          <Route path="members" element={
            <ProtectedRoute>
              <AdminMembers />
            </ProtectedRoute>
          } />
        </Route>

        {/* Test Route - Remove after debugging */}
        <Route path="/test-auth" element={<TestAuth />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
