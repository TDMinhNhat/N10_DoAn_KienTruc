import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterCoursePage = ({ currentUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    return (
        <div>
            {currentUser && (
                <div className="container">
                    <h1>Register Course</h1>
                </div>
            )}
        </div>
    );
}

export default RegisterCoursePage;