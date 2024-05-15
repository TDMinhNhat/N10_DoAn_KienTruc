import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/HomePage';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Profile from '../components/ProfilePage';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path="/group-role" element={<PrivateRoutes><Profile /></PrivateRoutes>} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="*">404 not found </Route>
        </Routes>
    );
}

export default AppRoutes;