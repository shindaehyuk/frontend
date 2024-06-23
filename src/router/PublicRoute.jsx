import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
  const isLogin = localStorage.getItem('teamId');
  return isLogin ? <Navigate to="/timetable" /> : <Outlet />;
};

export default PublicRoute;
