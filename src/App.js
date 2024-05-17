import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import HomePage from './components/Home/HomePage';
import LoginForm from './components/Login/Login';
import NavigationBar from './components/NavBar/NavigationBar';
import ProfilePage from './components/Profile/ProfilePage';
import RegisterForm from './components/Register/Register';
import Sidebar from './components/NavBar/Sidebar';
import RegisterCoursePage from './components/RegisterCourse/RegisterCoursePage';
import RegisterGraduation from './components/RegisterGraduation/RegisterGraduationPage';
import StudyResult from './components/StudyResults/StudyResultsPage';
import UpdateSuggestion from './components/UpdateSuggestion/UpdateSuggestionPage';
import WeeklySchedule from './components/WeeklySchedule/WeeklySchedulePage';
import StudentManagement from './components_staff/studentManagement/StudentManagementPage';
import StaffManagement from './components_staff/teacherManagement/TeacherManagementPage';
import SubjectManagement from './components_staff/subjectManagement/SubjectManagementPage';

import { ToastContainer } from 'react-toastify';

// Khóa bí mật, bạn cần bảo mật khóa này cẩn thận hơn trong môi trường thực tế.
const secretKey = 'YOUR_SECRET_KEY';

function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

function decryptData(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

function PrivateRoute({ isLoggedIn, children }) {
    let location = useLocation();

    return (
        isLoggedIn ? children : <Navigate to="/" state={{ from: location }} />
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') ?
            decryptData(localStorage.getItem('isLoggedIn')) === 'true' :
            false
    );
    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem('currentUser') ?
            decryptData(localStorage.getItem('currentUser')) :
            null
    );

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        const user = localStorage.getItem('currentUser');

        if (loggedInStatus && user) {
            setIsLoggedIn(decryptData(loggedInStatus) === 'true');
            setCurrentUser(decryptData(user));
        }
    }, []);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        localStorage.setItem('isLoggedIn', encryptData('true'));
        localStorage.setItem('currentUser', encryptData(user));
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
    };

    return (
        <>
            <Router>
                <div>
                    <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUser={currentUser} />
                    <Sidebar />
                    <Routes>
                        <Route path="/dashboard" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                <HomePage currentUser={currentUser} onLogout={handleLogout} />
                            </PrivateRoute>
                        } />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />} />
                        <Route path="/profile" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                <ProfilePage currentUser={currentUser} onLogout={handleLogout} />
                            </PrivateRoute>
                        } />
                        <Route path="/register-course" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                <RegisterCoursePage currentUser={currentUser} onLogout={handleLogout} />
                            </PrivateRoute>
                        } />
                        <Route path="/register-graduation" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                <RegisterGraduation currentUser={currentUser} onLogout={handleLogout} />
                            </PrivateRoute>
                        } />
                        <Route path="/study-results" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                <StudyResult currentUser={currentUser} onLogout={handleLogout} />
                            </PrivateRoute>
                        } />
                        <Route path="/update-suggestion" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                <UpdateSuggestion currentUser={currentUser} onLogout={handleLogout} />
                            </PrivateRoute>
                        } />
                        <Route path="/weekly-schedule" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                <WeeklySchedule currentUser={currentUser} onLogout={handleLogout} />
                            </PrivateRoute>
                        } />

                        {/*  Staff */}
                        <Route path="/management/students" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                <StudentManagement currentUser={currentUser} onLogout={handleLogout} />
                            </PrivateRoute>
                        } />
                        <Route path="/management/teachers" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                <StaffManagement currentUser={currentUser} onLogout={handleLogout} />
                            </PrivateRoute>
                        } />
                        <Route path="/management/subject" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                <SubjectManagement currentUser={currentUser} onLogout={handleLogout} />
                            </PrivateRoute>
                        } />
                    </Routes>
                </div>
            </Router>
            <ToastContainer
                position="top-right" // vị trí hiển thị thông báo
                autoClose={5000} // thời gian hiển thị thông báo
                hideProgressBar={false} // thanh tiến trình
                newestOnTop={false}   // hiển thị thông báo mới nhất trên cùng
                closeOnClick // đóng thông báo khi click
                rtl={false} // hiển thị thông báo từ phải sang trái
                pauseOnFocusLoss // tạm dừng khi mất focus
                draggable // kéo thông báo
                pauseOnHover // tạm dừng khi di chuột
            />
        </>
    );
}

export default App;