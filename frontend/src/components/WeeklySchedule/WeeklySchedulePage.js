import React, { useEffect, useState } from 'react';
import WeeklySchedulePageStudent from './WeeklySchedulePageStudent';
import WeeklySchedulePageTeacher from './WeeklySchedulePageTeacher';

const WeeklySchedulePage = ({ currentUser }) => {
    if (currentUser.data.role === 'teacher') {
        return <WeeklySchedulePageTeacher currentUser={currentUser} />;
    } else if (currentUser.data.role === 'student') {
        return <WeeklySchedulePageStudent currentUser={currentUser} />;
    }

};

export default WeeklySchedulePage;