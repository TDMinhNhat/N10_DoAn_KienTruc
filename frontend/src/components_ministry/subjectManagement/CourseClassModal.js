import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { createSubjectScheduled } from './post.api';
import { toast } from 'react-toastify';
import ministryService from '../../services/ministry.service';

const statusMapping = {
  PLANNING: 'Đang lên kế hoạch',
  REGISTERED: 'Chờ sinh viên đăng ký',
  ACCEPTED: 'Đã chấp nhận',
  LOCKED: 'Đã khóa',
  REJECTED: 'Đã từ chối',
};

const CourseClassModal = ({ show, handleClose, courseClass }) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [courseClasses, setCourseClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (show) {
      setShowScheduleForm(false);
      reset();
    }
    fetchData();
  }, [show]);

  const fetchData = async () => {
    const response = await ministryService.getAllCourseClassScheduled();
    setCourseClasses(response.data.data.data);
    console.log('Course classes:', response.data.data.data);
  };

  useEffect(() => {
    getAllTeacher();
  }, []);

  const getAllTeacher = async () => {
    const response = await ministryService.getAllTeacher();
    console.log('Teachers:', response.data.data.data);

    const teachers = response.data.data.data.map((teacher) => ({
      value: teacher.id,
      label: teacher.fullName,
    }));
    setTeachers(teachers);
  };

  const handleAddSchedule = async (data) => {
    const payload = {
      room: data.room,
      fromLessonTime: parseInt(data.fromLessonTime, 10),
      toLessonTime: parseInt(data.toLessonTime, 10),
      fromDate: data.fromDate,
      toDate: data.toDate,
      dayOfWeek: data.dayOfWeek, // Include DayOfWeek
      groupPractice: data.groupPractice ? parseInt(data.groupPractice, 10) : 0,
      maxStudents: parseInt(data.maxStudents, 10),
      teacherId: {
        id: data.teacherId
      },
      courseClassID: {
        courseClassId: courseClass.courseClassId,
        shortName: courseClass.shortName,
        fullName: courseClass.fullName,
        semesterYear: courseClass.semesterYear,
        facultyID: {
          facultyID: courseClass.facultyID.facultyID,
          facultyName: courseClass.facultyID.facultyName,
          description: courseClass.facultyID.description
        },
        courseID: {
          courseId: courseClass.courseID.courseId,
          courseName: courseClass.courseID.courseName,
          credits: courseClass.courseID.credits,
          description: courseClass.courseID.description
        },
        semester: courseClass.semester,
        status: courseClass.status
      }
    };

    try {
      const response = await createSubjectScheduled(payload);
      console.log("check payload 123", payload);
      console.log('Schedule added:', response);
      setShowScheduleForm(false);
      handleClose();
      toast.success('Lịch học đã được thêm');
    } catch (error) {
      if (error.response) {
        console.error('Failed to add schedule:', error.response.data);
      } else if (error.request) {
        console.error('Failed to add schedule: No response received', error.request);
      } else {
        console.error('Failed to add schedule:', error.message);
      }
    }
  };

  if (!courseClass) return null;

  // Filter courseClasses to only include the ones that match the current courseClassId
  const filteredCourseClasses = courseClasses.filter(
    (cls) => cls.courseClassID.courseClassId === courseClass.courseClassId
  );

  return (
    <Modal show={show} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Lớp Học Phần</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Mã Lớp Học Phần:</strong> {courseClass.courseClassId} - {courseClass.shortName}</p>
        <p><strong>Tên Lớp Học Phần:</strong> {courseClass.fullName}</p>
        <p><strong>Tên Môn Học:</strong> {courseClass.courseID.courseName}</p>
        <p><strong>Số Tín Chỉ:</strong> {courseClass.courseID.credits}</p>
        <p><strong>Học Kỳ:</strong> {courseClass.semester}</p>
        <p><strong>Năm Học:</strong> {courseClass.semesterYear}</p>
        <p><strong>Khoa:</strong> {courseClass.facultyID.facultyName}</p>
        <p><strong>Trạng Thái:</strong> {statusMapping[courseClass.status]}</p>

        <h4>Lịch học:</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Lịch học</th>
              <th>Nhóm</th>
              <th>Phòng</th>
              <th>Giảng viên</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourseClasses.map((schedule, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>Thứ {schedule.dayOfWeek} (Tiết {schedule.fromLessonTime} - {schedule.toLessonTime})</td>
                <td>{schedule.groupPractice}</td>
                <td>{schedule.room}</td>
                <td>{schedule.teacherId.fullName}</td>
                <td>{schedule.fromDate} - {schedule.toDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {showScheduleForm && (
          <form onSubmit={handleSubmit(handleAddSchedule)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="room">Phòng</label>
                <input
                  id="room"
                  {...register('room', { required: 'Room is required' })}
                  placeholder="Nhập phòng"
                  className={`form-control ${errors.room ? 'is-invalid' : ''}`}
                />
                {errors.room && <div className="invalid-feedback">{errors.room.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="fromLessonTime">Từ Tiết</label>
                <input
                  id="fromLessonTime"
                  type="number"
                  {...register('fromLessonTime', { required: 'From Lesson Time is required' })}
                  placeholder="Nhập từ tiết"
                  className={`form-control ${errors.fromLessonTime ? 'is-invalid' : ''}`}
                />
                {errors.fromLessonTime && <div className="invalid-feedback">{errors.fromLessonTime.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="toLessonTime">Đến Tiết</label>
                <input
                  id="toLessonTime"
                  type="number"
                  {...register('toLessonTime', { required: 'To Lesson Time is required' })}
                  placeholder="Nhập đến tiết"
                  className={`form-control ${errors.toLessonTime ? 'is-invalid' : ''}`}
                />
                {errors.toLessonTime && <div className="invalid-feedback">{errors.toLessonTime.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="fromDate">Từ Ngày</label>
                <input
                  id="fromDate"
                  type="date"
                  {...register('fromDate', { required: 'From Date is required' })}
                  className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`}
                />
                {errors.fromDate && <div className="invalid-feedback">{errors.fromDate.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="toDate">Đến Ngày</label>
                <input
                  id="toDate"
                  type="date"
                  {...register('toDate', { required: 'To Date is required' })}
                  className={`form-control ${errors.toDate ? 'is-invalid' : ''}`}
                />
                {errors.toDate && <div className="invalid-feedback">{errors.toDate.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="dayOfWeek">Ngày Trong Tuần</label>
                <input
                  id="dayOfWeek"
                  {...register('dayOfWeek', { required: 'Day of Week is required' })}
                  placeholder="Nhập ngày trong tuần"
                  className={`form-control ${errors.dayOfWeek ? 'is-invalid' : ''}`}
                />
                {errors.dayOfWeek && <div className="invalid-feedback">{errors.dayOfWeek.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="groupPractice">Nhóm Thực Hành</label>
                <input
                  id="groupPractice"
                  type="number"
                  {...register('groupPractice')}
                  placeholder="Nhập nhóm thực hành (có thể để trống)"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="maxStudents">Số Lượng Sinh Viên Tối Đa</label>
                <input
                  id="maxStudents"
                  type="number"
                  {...register('maxStudents', { required: 'Max Students is required' })}
                  placeholder="Nhập số lượng sinh viên tối đa"
                  className={`form-control ${errors.maxStudents ? 'is-invalid' : ''}`}
                />
                {errors.maxStudents && <div className="invalid-feedback">{errors.maxStudents.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="teacherId">Giảng Viên</label>
                <select
                  id="teacherId"
                  {...register('teacherId', { required: 'Teacher ID is required' })}
                  className={`form-control ${errors.teacherId ? 'is-invalid' : ''}`}
                >
                  <option value="">Chọn giảng viên</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.value} value={teacher.value}>{teacher.label}</option>
                  ))}
                </select>
                {errors.teacherId && <div className="invalid-feedback">{errors.teacherId.message}</div>}
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Lưu lịch học
              </Button>
            </div>
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {courseClass.status === 'PLANNING' && !showScheduleForm && (
          <Button variant="primary" onClick={() => setShowScheduleForm(true)}>
            Thêm lịch học
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CourseClassModal;
