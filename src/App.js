import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import LoginForm from './components/Login/Login';
import NavigationBar from './components/NavBar/NavigationBar';
import ProfilePage from './components/Profile/ProfilePage';
import RegisterForm from './components/Register/Register';
import NavBarColumn from './components/NavBar/NavBarColumn';
import RegisterCoursePage from './components/RegisterCourse/RegisterCoursePage';
import ChangePassword from './components/ChangePassword/ChangePasswordPage';
import StudyResult from './components/StudyResults/StudyResultsPage';
import UpdateSuggestion from './components/UpdateSuggestion/UpdateSuggestionPage';
import WeeklySchedule from './components/WeeklySchedule/WeeklySchedulePage';

import { ToastContainer } from 'react-toastify';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    return (
        <>
        <Router>
            <div>
                <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUser={currentUser} />
                <NavBarColumn />
                <Routes>
                    <Route path="/dashboard" element={<HomePage currentUser={currentUser} onLogout={handleLogout} />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
                    {/* Update the line below */}
                    <Route path="/profile" element={<ProfilePage currentUser={currentUser} onLogout={handleLogout} />} />
                    <Route path="/register-course" element={<RegisterCoursePage currentUser={currentUser} onLogout={handleLogout} />} />
                    <Route path="/change-password" element={<ChangePassword currentUser={currentUser} onLogout={handleLogout} />} />
                    <Route path="/study-results" element={<StudyResult currentUser={currentUser} onLogout={handleLogout} />} />
                    <Route path="/update-suggestion" element={<UpdateSuggestion currentUser={currentUser} onLogout={handleLogout} />} />
                    <Route path="/weekly-schedule" element={<WeeklySchedule currentUser={currentUser} onLogout={handleLogout} />} />
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
