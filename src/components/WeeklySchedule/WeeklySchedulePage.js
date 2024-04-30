import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WeeklySchedulePage = ({ currentUser }) => {
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
                    <h1>Weekly Schedule</h1>
                </div>
            )}
        </div>
    );
}

export default WeeklySchedulePage;