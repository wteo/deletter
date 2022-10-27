import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
