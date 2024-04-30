import React, {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ currentUser}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
        console.log('check cu',currentUser);
    }, [currentUser, navigate]);

    return (
        <div>
            {currentUser && (
                <div className="container">
                    <h1>Profile</h1>
                    <p>Username: {currentUser.user.username}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
