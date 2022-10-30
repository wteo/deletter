import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import './App.module.scss';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Public pages
import LoginPage from './pages/public/LoginPage';
import ForgotPassword from './pages/public/ForgotPasswordPage'
import RegisterPage from './pages/public/RegisterPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Private pages
import DashboardPage from './pages/private/DashboardPage';


function App() {

  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/login/password' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
