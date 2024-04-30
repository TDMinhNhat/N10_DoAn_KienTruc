import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateSuggestionPage = ({ currentUser }) => {
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
                    <h1>Update Suggestion</h1>
                </div>
            )}
        </div>
    );
}

export default UpdateSuggestionPage;