import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isLogin = localStorage.getItem('teamId');
  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
