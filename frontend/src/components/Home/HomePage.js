// HomePage.js
import React, { useEffect, useState } from 'react';
import HomePageMinistry from './HomePageMinistry';
import HomePageTeacher from './HomePageTeacher';
import HomePageStudent from './HomePageStudent';

const HomePage = ({ currentUser }) => {
    if (currentUser.data.role === 'ministry') {
        return <HomePageMinistry currentUser={currentUser} />;
    } else if (currentUser.data.role === 'teacher') {
        return <HomePageTeacher currentUser={currentUser} />;
    } else if (currentUser.data.role === 'student') {
        return <HomePageStudent currentUser={currentUser} />;
    }

};

export default HomePage;