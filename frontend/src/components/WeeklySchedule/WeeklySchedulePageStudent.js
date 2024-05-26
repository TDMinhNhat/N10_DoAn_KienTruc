import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import StudentService from '../../services/student.service';

const WeeklySchedulePage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [scheduleType, setScheduleType] = useState('all');
  const [scheduleData, setScheduleData] = useState([]); // State for fetched schedule data

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = ['Morning', 'Afternoon', 'Evening'];

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    } else {
      fetchScheduleData(currentUser.data.person.id); // Fetch data when component mounts or currentUser changes
    }
  }, [currentUser, navigate]);

  const fetchTeacherName = async (teacherId) => {
    try {
      const response = await StudentService.getTeacherInfo(teacherId);
      console.log('Teacher Data:', response.data.data);
      if (response.status === 200) {
        return response.data.data.data.fullName; // Assuming the teacher's name is in response.data.data.name
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      return 'Unknown';
    }
  };

  const fetchScheduleData = async (userId) => {
    try {
      const response = await StudentService.getCourseScheduled(userId);
      if (response.status === 200) {
        const apiData = response.data.data.data;
        const formattedData = await Promise.all(apiData.map(async (item) => {
          const fromDate = moment(item.fromDate);
          const toDate = moment(item.toDate);
          const dayOfWeek = item.dayOfWeek;
          const teacherName = await fetchTeacherName(item.teacherId); // Fetch teacher name

          let repeatingEvents = [];
          for (let date = fromDate.clone().day(dayOfWeek); date.isSameOrBefore(toDate); date.add(1, 'weeks')) {
            if (date.isSameOrAfter(fromDate) && date.isSameOrBefore(toDate)) {
              repeatingEvents.push({
                id: item.id,
                name: item.courseClassID.courseID.courseName,
                class: item.courseClassID.shortName,
                courseCode: item.courseClassID.courseID.courseId,
                slot: `${item.fromLessonTime}-${item.toLessonTime}`,
                room: item.room,
                lecturer: teacherName, // Use fetched teacher name
                date: date.format('YYYY-MM-DD'),
                scheduleType: 'study' // Assuming all are study schedules; adjust if needed
              });
            }
          }
          return repeatingEvents;
        })).then(events => events.flat());
        setScheduleData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
  };

  const changeWeek = (amount) => {
    setCurrentWeek(currentWeek.clone().add(amount, 'weeks'));
  };

  const handleUserSelection = (newWeek, newType) => {
    console.log('Current Week:', newWeek.format('YYYY-MM-DD'));
    console.log('Schedule Type:', newType);

    const weekDaysWithDates = weekDays.map((day, index) => ({
      day,
      date: newWeek.clone().startOf('isoWeek').add(index, 'days').format('DD/MM/YYYY')
    }));
    console.log('Week Days with Dates:', weekDaysWithDates);
  };

  const handleDateChange = (event) => {
    const newDate = moment(event.target.value);
    setCurrentWeek(newDate.startOf('isoWeek'));
    handleUserSelection(newDate.startOf('isoWeek'), scheduleType);
  };

  const handleScheduleTypeChange = (event) => {
    setScheduleType(event.target.value);
    handleUserSelection(currentWeek, event.target.value);
  };

  const determineTimeSlot = (slot) => {
    const slotRange = parseInt(slot.split('-')[1]); // Get the upper range of the slot
    if (slotRange <= 6) {
      return 'Morning';
    } else if (slotRange <= 12) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  };

  const getScheduleForDateAndSlot = (date, timeSlotLabel) => {
    return scheduleData
      .filter(item => (scheduleType === 'all' || item.scheduleType === scheduleType))
      .filter(item => moment(item.date, 'YYYY-MM-DD').isSame(date, 'day'))
      .filter(item => determineTimeSlot(item.slot) === timeSlotLabel)
      .map(item => (
        <div key={item.id} className={`p-2 ${item.scheduleType === 'study' ? 'bg-info' : 'bg-warning'}`}>
          <p>{item.name}</p>
          <p>{item.class} -</p>
          <p>{item.courseCode}</p>
          <p>Tiết: {item.slot}</p>
          <p>Phòng: {item.room}</p>
          <p>GV: {item.lecturer}</p>
        </div>
      ));
  };

  return (
    <div className="container" style={{ marginTop: 80, zIndex: 20 }}>
      <div className="card bg-light text-black p-4">
        <h3 className="">Lịch học, lịch thi theo tuần</h3>
        <div className="row mb-2">
          <div className="col text-center">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scheduleType" id="all" value="all" checked={scheduleType === 'all'} onChange={handleScheduleTypeChange} />
              <label className="form-check-label" htmlFor="all">Tất cả</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scheduleType" id="study" value="study" checked={scheduleType === 'study'} onChange={handleScheduleTypeChange} />
              <label className="form-check-label" htmlFor="study">Lịch học</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scheduleType" id="exam" value="exam" checked={scheduleType === 'exam'} onChange={handleScheduleTypeChange} />
              <label className="form-check-label" htmlFor="exam">Lịch thi</label>
            </div>
            <input type="date" onChange={handleDateChange} className="form-control d-inline-block w-auto me-3" />
            <button className="btn btn-secondary me-2" onClick={() => { setCurrentWeek(moment()); handleUserSelection(currentWeek, scheduleType); }}>Hiện tại</button>
            <button className="btn btn-primary me-2" onClick={() => { changeWeek(-1); handleUserSelection(currentWeek, scheduleType); }}>Trở về</button>
            <button className="btn btn-primary" onClick={() => { changeWeek(1); handleUserSelection(currentWeek, scheduleType); }}>Tiếp</button>
          </div>
        </div>
        <table className="table table-bordered" style={{ tableLayout: 'fixed', wordWrap: 'break-word' }}>
          <thead>
            <tr>
              <th className='text-center bg-success align-middle'>Ca học</th>
              {weekDays.map((day, index) => (
                <th key={day} className="text-center bg-success">
                  {day} <br />
                  {currentWeek.clone().startOf('isoWeek').add(index, 'days').format('DD/MM/YYYY')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(timeSlotLabel => (
              <tr key={timeSlotLabel}>
                <td className="text-center align-middle bg-secondary">{timeSlotLabel}</td>
                {weekDays.map((day, dayIndex) => {
                  const date = currentWeek.clone().startOf('isoWeek').add(dayIndex, 'days');
                  return (
                    <td key={day + timeSlotLabel}>
                      {getScheduleForDateAndSlot(date, timeSlotLabel)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklySchedulePage;
