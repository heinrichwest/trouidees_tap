// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/public/Login';
import HomePage from '../pages/public/HomePage';
import Courses from '../pages/Courses';
import Profile from '../pages/profile/Profile';
import ProtectedRoutes from './ProtectedRoutes';
import Progress from '../pages/Progress'; // <-- import Progress page

const AppRoutes: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Home */}
      <Route
        path="/"
        element={
          <HomePage
            onBrowseCourses={() =>
              user ? navigate('/courses') : navigate('/login')
            }
            onRegister={() => navigate('/login')}
          />
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/courses" replace />}
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes isAuthenticated={!!user} />}>
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile user={user} onLogout={logout} />} />
        <Route path="/progress" element={<Progress />} /> {/* <-- add Progress */}
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
