import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DbProvider } from './contexts/DbContext';

import './App.module.scss';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

// Public pages
import AboutPage from './pages/public/AboutPage';
import LoginPage from './pages/public/LoginPage';
import ForgotPassword from './pages/public/ForgotPasswordPage'
import RegisterPage from './pages/public/RegisterPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Private pages
import DashboardPage from './pages/private/DashboardPage';
import FormPage from './pages/private/FormPage';
import AccountPage from './pages/private/AccountPage';

function App() {

  return (
    <AuthProvider>
        <Navigation />
        <Routes>
          <Route path='/' element={<Navigate replace to='/login' />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/login/password' element={<ForgotPassword />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/form//*' element={<DbProvider><FormPage /></DbProvider>} />
          <Route path='/account//*' element={<DbProvider><AccountPage /></DbProvider>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
    </AuthProvider>
  );
}

export default App;
