import React, { useEffect, useState, useMemo, useRef } from 'react';
import ModalComponent from '../../modal/Modal';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { fetchAllSubject, createSubject } from './post.api';
import ministryService from '../../services/ministry.service';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import CourseClassModal from './CourseClassModal';
import UpdateStatusModal from './UpdateStatusModal'; // Import the new modal component

const statusMapping = {
  PLANNING: 'Đang lên kế hoạch',
  REGISTERED: 'Chờ sinh viên đăng ký',
  ACCEPTED: 'Đã chấp nhận',
  LOCKED: 'Đã khóa',
  REJECTED: 'Đã từ chối',
};
const statusMapping2 = {
  PLANNING: 'Đang lên kế hoạch'
};

const semesters = [1, 2, 3];
const semesterYears = ["2021 - 2022", "2022 - 2023", "2023 - 2024", "2024 - 2025", "2025 - 2026"];

const getCurrentAcademicYear = () => {
  const currentYear = new Date().getFullYear();
  return `${currentYear} - ${currentYear + 1}`;
};

const TableSubject = ({ currentUser }) => {

  const nameInputRef = useRef(null);
  const shortNameInputRef = useRef(null);
  const typeInputRef = useRef(null);

  const [errorField, setErrorField] = useState('');
  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const [semester, setSemester] = useState('');
  const [semesterYear, setSemesterYear] = useState('');

  const [showCourseClassModal, setShowCourseClassModal] = useState(false);
  const [selectedCourseClass, setSelectedCourseClass] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [courseFaculty, setCourseFaculty] = useState([]);

  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  useEffect(() => {
    fetchData();
    fetchInfo();
  }, [semester, semesterYear]);

  useEffect(() => {
    getCourseFaculty();
  }, [userInfo]);

  async function fetchInfo() {
    const response = await ministryService.getPersonalInfo(currentUser.data.person.id);
    setUserInfo(response.data);
    console.log('check', response.data);
  }

  async function getCourseFaculty() {
    if (userInfo && userInfo.data && userInfo.data.data && userInfo.data.data.facultyID) {
      const response = await ministryService.getCourseFaculty(userInfo.data.data.facultyID.facultyID);
      console.log('check getCourseFaculty', response.data.data.data);

      const courses = response.data.data.data.map(item => ({
        courseId: item.id.course.courseId,
        courseName: item.id.course.courseName
      }));

      console.log('Extracted courses', courses);
      setCourseFaculty(courses);
    }
  }

  const fetchData = async () => {
    const response = await fetchAllSubject();
    const subjects = response.data.data.data.map((item) => ({
      id: item.courseClassId || 'undefined_id',
      name: item.courseID.courseName,
      shortName: item.shortName,
      type: statusMapping[item.status] || item.status,
      semester: item.semester,
      semesterYear: item.semesterYear,
      courseClass: item
    }));
    setData(subjects.filter(item =>
      (semester ? item.semester === parseInt(semester) : true) &&
      (semesterYear ? item.semesterYear === semesterYear : true)
    ));
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleCreateSubject = async (formData) => {
    const newSubject = {
      courseClassId: formData.courseClassId,
      shortName: formData.shortName,
      fullName: formData.fullName,
      semesterYear: formData.semesterYear,
      facultyID: {
        facultyID: userInfo.data.data.facultyID.facultyID,
      },
      courseID: {
        courseId: formData.courseId,
      },
      semester: formData.semester,
      status: formData.status,
    };

    try {
      console.log('Create subject:', newSubject);
      const response = await createSubject(newSubject);
      console.log('Create subject:', response.data);
      setData(prevData => [...prevData, response.data]);
      reset();
      toast.success('Create subject successfully');
      fetchData();
    } catch (error) {
      toast.error(error.message);
      if (error.field) {
        setErrorField(error.field);
        if (error.field === 'name' && nameInputRef.current) {
          nameInputRef.current?.focus();
        } else if (error.field === 'shortName' && shortNameInputRef.current) {
          shortNameInputRef.current?.focus();
        } else if (error.field === 'type' && typeInputRef.current) {
          typeInputRef.current?.focus();
        }
      }
    }
  };

  const handleRowClick = (courseClass) => {
    setSelectedCourseClass(courseClass);
    setShowCourseClassModal(true);
  };

  const handleEditStatusClick = (courseClass) => {
    setSelectedCourseClass(courseClass);
    setShowUpdateStatusModal(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'stt',
        header: 'STT',
        Cell: ({ row }) => row.index + 1,
        enableEditing: false,
      },
      {
        accessorKey: 'id',
        header: 'Mã Lớp Học Phần',
        enableEditing: false,
      },
      {
        accessorKey: 'name',
        header: 'Tên Học Phần'
      },
      {
        accessorKey: 'shortName',
        header: 'Tên Lớp Học Phần'
      },
      {
        accessorKey: 'type',
        header: 'Trạng Thái'
      },
      {
        accessorKey: 'semester',
        header: 'Học Kỳ'
      },
      {
        accessorKey: 'semesterYear',
        header: 'Năm Học'
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <button onClick={(e) =>  {e.stopPropagation(); handleEditStatusClick(row.original.courseClass)}}>
            Edit Status
          </button>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data,
    paginationDisplayMode: 'pages',
    initialState: {
      pagination: { pageSize: 5, pageIndex: 1 },
    },
    positionToolbarAlertBanner: 'top',
    enableFilterMatchHighlighting: false,
    getRowId: (row) => (row.id ? row.id.toString() : 'undefined_id'),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    muiSearchTextFieldProps: {
      label: 'Search All Fields'
    },
    autoResetPageIndex: false,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row.original.courseClass),
      style: { cursor: 'pointer' },
    }),
  });

  const currentAcademicYear = getCurrentAcademicYear();

  return (
    <>
      {userInfo && (
        <form onSubmit={handleSubmit(handleCreateSubject)}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="courseClassId">Mã Lớp Học Phần</label>
              <input
                id="courseClassId"
                {...register('courseClassId', {
                  required: 'Course Class ID is required',
                  maxLength: { value: 50, message: 'Course Class ID must be less than 50 characters' }
                })}
                placeholder="Enter Course Class ID"
                className={`form-control ${errors.courseClassId ? 'is-invalid' : ''}`}
                onChange={() => setErrorField('')}
              />
              {errors.courseClassId && <div className="invalid-feedback">{errors.courseClassId.message}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="shortName">Tên Lớp Học Phần</label>
              <input id="shortName"
                {...register('shortName', {
                  required: 'Short Name is required',
                  maxLength: { value: 50, message: 'Short Name must be less than 50 characters' }
                })}
                placeholder="Enter Short Name"
                className={`form-control ${errors.shortName ? 'is-invalid' : ''}`}
                onChange={() => setErrorField('')}
              />
              {errors.shortName && <div className="invalid-feedback">{errors.shortName.message}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="fullName">Tên Học Phần</label>
              <input id="fullName"
                {...register('fullName', {
                  required: 'Full Name is required',
                  maxLength: { value: 50, message: 'Full Name must be less than 50 characters' }
                })}
                placeholder="Enter Full Name"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                onChange={() => setErrorField('')}
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="semesterYear">Năm Học</label>
              <select id="semesterYear"
                {...register('semesterYear', {
                  required: 'Semester Year is required'
                })}
                className={`form-control ${errors.semesterYear ? 'is-invalid' : ''}`}
                onChange={() => setErrorField('')}
              >
                <option value="">Chọn Năm Học</option>
                <option value={currentAcademicYear}>{currentAcademicYear}</option>
              </select>
              {errors.semesterYear && <div className="invalid-feedback">{errors.semesterYear.message}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="facultyID">Mã Khoa</label>
              <input id="facultyID"
                value={userInfo.data.data.facultyID.facultyID}
                readOnly
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="courseId">Mã Môn Học</label>
              <select
                id="courseId"
                {...register('courseId', {
                  required: 'Course ID is required',
                })}
                className={`form-control ${errors.courseId ? 'is-invalid' : ''}`}
                onChange={() => setErrorField('')}
              >
                <option value="">Chọn Mã Môn Học</option>
                {courseFaculty.map(({ courseId, courseName }) => (
                  <option key={courseId} value={courseId}>{courseName}</option>
                ))}
              </select>
              {errors.courseId && <div className="invalid-feedback">{errors.courseId.message}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="semester">Học Kỳ</label>
              <select id="semester"
                {...register('semester', {
                  required: 'Semester is required'
                })}
                className={`form-control ${errors.semester ? 'is-invalid' : ''}`}
                onChange={() => setErrorField('')}
              >
                <option value="">Chọn Học Kỳ</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
              {errors.semester && <div className="invalid-feedback">{errors.semester.message}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="status">Trạng Thái</label>
              <select id="status"
                {...register('status', {
                  required: 'Status is required'
                })}
                className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                onChange={() => setErrorField('')}
              >
                <option value="">Chọn Trạng Thái</option>
                {Object.entries(statusMapping2).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success">Create</button>
          </div>
        </form>
      )}
      <hr className="my-4" />
      <div className="row mb-3">
        <div className="col-md-6">
          <FormControl fullWidth>
            <InputLabel id="semester-select-label">Semester</InputLabel>
            <Select
              labelId="semester-select-label"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {semesters.map((sem) => (
                <MenuItem key={sem} value={sem}>{sem}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-6">
          <FormControl fullWidth>
            <InputLabel id="semester-year-select-label">Semester Year</InputLabel>
            <Select
              labelId="semester-year-select-label"
              value={semesterYear}
              onChange={(e) => setSemesterYear(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {semesterYears.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <MaterialReactTable table={table} />
      <CourseClassModal
        show={showCourseClassModal}
        handleClose={() => setShowCourseClassModal(false)}
        courseClass={selectedCourseClass}
      />
      <UpdateStatusModal
        show={showUpdateStatusModal}
        handleClose={() => setShowUpdateStatusModal(false)}
        courseClass={selectedCourseClass}
        onStatusUpdate={fetchData}
      />
    </>
  );
};

export default TableSubject;
