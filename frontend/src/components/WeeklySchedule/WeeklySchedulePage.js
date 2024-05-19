import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const scheduleData = [
  {
    id: 1,
    name: 'Kiến trúc và Thiết kế phần mềm',
    class: 'KTPM',
    courseCode: 'INT2208 1',
    slot: '1-3',
    room: 'A1',
    lecturer: 'Nguyễn Văn A',
    date: '2024-05-12',
    scheduleType: 'study'
  },
  {
    id: 2,
    name: 'Nhập môn dữ liệu lớn',
    class: 'KTPM',
    courseCode: 'INT2208 1',
    slot: '4-6',
    room: 'A1',
    lecturer: 'Nguyễn Văn A',
    date: '2024-05-17', // Previously incorrect as '2024-17-05'
    scheduleType: 'study'
  },
  {
    id: 3,
    name: 'Lập trình phân tán với công nghệ Java',
    class: 'KTPM',
    courseCode: 'INT2208 1',
    slot: '7-9',
    room: 'A1',
    lecturer: 'Nguyễn Văn A',
    date: '2024-05-16', // Previously incorrect as '2024-16-05'
    scheduleType: 'study'
  },
  {
    id: 4,
    name: 'Quản lý dự án CNTT',
    class: 'KTPM',
    courseCode: 'INT2208 1',
    slot: '1-3',
    room: 'A1',
    lecturer: 'Nguyễn Văn A',
    date: '2024-05-15',
    scheduleType: 'exam'
  },
  {
    id: 5,
    name: 'Lập trình hướng đối tượng',
    class: 'KTPM',
    courseCode: 'INT2208 1',
    slot: '13-15',
    room: 'A1',
    lecturer: 'Nguyễn Văn A',
    date: '2024-05-15',
    scheduleType: 'exam'
  }
];

const WeeklySchedulePage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [scheduleType, setScheduleType] = useState('all');
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = ['Morning', 'Afternoon', 'Evening'];

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

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
    <div className="container" style={{ marginTop: 80,zIndex:20  }}>
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
      </div >
    </div >
  );
};

export default WeeklySchedulePage;



