import React, { useEffect, useState } from 'react';
import UpdateSuggestionPageMinistry from './UpdateSuggestionPageMinistry';
import UpdateSuggestionPageTeacher from './UpdateSuggestionPageTeacher';
import UpdateSuggestionPageStudent from './UpdateSuggestionPageStudent';

const UpdateSuggestionPage = ({ currentUser }) => {
    if (currentUser.data.role === 'ministry') {
        return <UpdateSuggestionPageMinistry currentUser={currentUser} />;
    } else if (currentUser.data.role === 'teacher') {
        return <UpdateSuggestionPageTeacher currentUser={currentUser} />;
    } else if (currentUser.data.role === 'student') {
        return <UpdateSuggestionPageStudent currentUser={currentUser} />;
    }

};

export default UpdateSuggestionPage;