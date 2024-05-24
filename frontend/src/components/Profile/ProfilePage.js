import React, { useEffect, useState } from 'react';
import ProfilePageMinistry from './ProfilePageMinistry';
import ProfilePageTeacher from './ProfilePageTeacher';
import ProfilePageStudent from './ProfilePageStudent';

const ProfilePage = ({ currentUser }) => {
    if (currentUser.data.role === 'ministry') {
        return <ProfilePageMinistry currentUser={currentUser} />;
    } else if (currentUser.data.role === 'teacher') {
        return <ProfilePageTeacher currentUser={currentUser} />;
    } else if (currentUser.data.role === 'student') {
        return <ProfilePageStudent currentUser={currentUser} />;
    }

};

export default ProfilePage;