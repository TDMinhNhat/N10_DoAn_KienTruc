import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicSelect from './components/BasicSelect';
import RowRadioButtonsGroup from './components/RowRadioButtonsGroup';
import StudentService from '../../services/student.service';
import { toast } from 'react-toastify';
import { Modal, Button, Table } from 'react-bootstrap';

const statusMapping = {
    PLANNING: 'Đang lên kế hoạch',
    REGISTERED: 'Chờ sinh viên đăng ký',
    ACCEPTED: 'Đã chấp nhận',
    LOCKED: 'Đã khóa',
    REJECTED: 'Đã từ chối',
};

const RegisterCoursePage = ({ currentUser }) => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);
    const [radioValue, setRadioValue] = useState('hoc moi');
    const [selectedYear, setSelectedYear] = useState('2020-2021');
    const [selectedSemester, setSelectedSemester] = useState(''); // Initialize with an empty string
    const [courses, setCourses] = useState([]);
    const [semesterCourses, setSemesterCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedClassGroupPractice, setSelectedClassGroupPractice] = useState(null);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [clickedClass, setClickedClass] = useState(null);
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [detailedCourse, setDetailedCourse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalCourse, setModalCourse] = useState([]);
    const [selectedRowClass, setSelectedRowClass] = useState(null); // Highlight the selected row

    const handleValueChange = (value) => {
        const [semester, year] = value.split(' ');
        setSelectedYear(year.slice(1, -1)); // Remove the parentheses
        setSelectedSemester(semester);
        setSelectedRow(null);
        setSelectedCourse([]);
        setSelectedClass(null);
        setSelectedClassGroupPractice(null);
        setSelectedClassId(null);
        setClickedClass(null);
    };

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        } else {
            if (selectedSemester) {
                fetchCourses();
                fetchRegisteredCourses();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, selectedYear, selectedSemester]);

    const fetchTeacherName = async (teacherId) => {
        try {
            console.log('Fetching teacher data:', teacherId);
            const response = await StudentService.getTeacherInfo(teacherId);
            console.log('Teacher Data:', response.data.data);
            if (response.status === 200) {
                return response.data.data.data.fullName;// Assuming the teacher's name is in response.data.data.name
            }
        } catch (error) {
            console.error('Error fetching teacher data:', error);
            return 'Unknown';
        }
    };

    const fetchCourses = async () => {
        if (!selectedSemester) return; // Skip if selectedSemester is empty
        try {
            const facultyID = currentUser.data.person.facultyID;
            const formattedYear = selectedYear.replace("-", " - ");
            const response = await StudentService.getBySemesterYear(currentUser.data.person.id, formattedYear, facultyID);
            console.log(`Fetching data from ${currentUser.data.person.id}, ${formattedYear}, ${facultyID}`);
            if (response.status === 200) {
                const allCourses = response.data.data.data;
                console.log('All courses:', allCourses);
                const selectedSemesterNumber = parseInt(selectedSemester.slice(2), 10); // Get the number after "HK" and convert it to a number
                const semesterCourses = await Promise.all(
                    allCourses.filter(course => course.courseClassID.semester === selectedSemesterNumber).map(async course => ({
                        ...course,
                        teacherName: await fetchTeacherName(course.teacherId),
                    }))
                );
                console.log('selectedSemester', selectedSemesterNumber);
                setSemesterCourses(semesterCourses);
                console.log('Semester courses:', semesterCourses);
                const uniqueCourses = removeDuplicates(semesterCourses);
                setCourses(uniqueCourses);
                console.log('Unique Courses:', uniqueCourses);
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    const fetchRegisteredCourses = async () => {
        if (!selectedSemester) return; // Skip if selectedSemester is empty
        try {
            const facultyID = currentUser.data.person.facultyID;
            const formattedYear = selectedYear.replace("-", " - ");
            const response = await StudentService.getCourseRegistered(currentUser.data.person.id, formattedYear, facultyID);
            if (response.status === 200) {
                const allCourses2 = response.data.data.data;
                console.log('All courses 2:', allCourses2);
                const selectedSemesterNumber = parseInt(selectedSemester.slice(2), 10);
                console.log('selectedSemester 2', selectedSemesterNumber);
                console.log('formattedYear 2:', formattedYear);
                const semesterCourses = await Promise.all(
                    allCourses2.filter(course => course.courseClassID.semester === selectedSemesterNumber && course.courseClassID.semesterYear === formattedYear).map(async course => ({
                        ...course,
                        teacherName: await fetchTeacherName(course.teacherId),
                    }))
                );
                console.log('semesterCourses 2:', semesterCourses);
                setDetailedCourse(semesterCourses);
                const uniqueCourses2 = removeDuplicates(semesterCourses);
                console.log('Unique Courses 2:', uniqueCourses2);
                setRegisteredCourses(uniqueCourses2);
                console.log('Registered courses:', semesterCourses);
            }
        } catch (error) {
            console.error('Failed to fetch registered courses:', error);
        }
    };

    const removeDuplicates = (courses) => {
        const seen = new Set();
        return courses.filter(course => {
            const courseId = course.courseClassID.courseID.courseId;
            if (seen.has(courseId)) {
                return false;
            } else {
                seen.add(courseId);
                return true;
            }
        });
    };

    const SelectMonHocChoDangKy = (courseId) => {
        const selectedCourses = semesterCourses.filter(course => course.courseClassID.courseID.courseId === courseId);
        const uniqueClasses = removeDuplicateClasses(selectedCourses);
        console.log('Selected course ID:', courseId);
        console.log('Selected courses:', selectedCourses);
        setSelectedRow(courseId);
        setSelectedCourse(uniqueClasses);
        selectedRowClass && setSelectedRowClass(null); // Reset selected row class
        setSelectedClass(null); // Reset selected class
    };

    const removeDuplicateClasses = (courses) => {
        const seen = new Set();
        return courses.filter(course => {
            const classId = course.courseClassID.courseClassId;
            if (seen.has(classId)) {
                return false;
            } else {
                seen.add(classId);
                return true;
            }
        });
    };

    const SelectLopHocChoDangKy = (id) => {
        const selectedClass = semesterCourses.filter(course => course.courseClassID.courseClassId === id);
        const groupPractice = selectedClass.find(course => course.groupPractice !== null)?.groupPractice || null; // Find the first non-null groupPractice value
        console.log('Selected class ID:', id);
        console.log('Group practice:', groupPractice);
        setSelectedClass(selectedClass);
        setSelectedClassGroupPractice(groupPractice);
        setSelectedClassId(id);
        setClickedClass(null); // Reset clicked class
        console.log('Selected class:', selectedClass);
        setSelectedRowClass(id); // Highlight the selected row
    };

    const handleClassClick = (id) => {
        const selectedClassDetail = selectedClass.find(course => course.id === id);
        console.log('Clicked class ID:', id);
        console.log('Selected class details:', selectedClassDetail);
        setClickedClass(selectedClassDetail);
    };

    const handleRegisterClick = async () => {
        try {
            if (selectedClassGroupPractice === null) {
                const response = await StudentService.registerTheoryCourse(currentUser.data.person.id, selectedClassId);
                toast.success(`Đăng ký thành công: Course Class ID: ${selectedClassId}`);
                fetchRegisteredCourses(); // Update registered courses after successful registration
                fetchCourses(); // Update courses after successful registration
                setSelectedRow(null);
                setSelectedCourse([]);
                setSelectedClass(null);
            } else {
                if (clickedClass && clickedClass.groupPractice !== null) {
                    const response = await StudentService.registerPracticeCourse(currentUser.data.person.id, selectedClassId, clickedClass.groupPractice);
                    toast.success(`Đăng ký thành công: Course Class ID: ${selectedClassId}, Group Practice: ${clickedClass.groupPractice}`);
                    fetchRegisteredCourses(); // Update registered courses after successful registration
                    fetchCourses(); // Update courses after successful registration
                    setSelectedRow(null);
                    setSelectedCourse([]);
                    setSelectedClass(null);
                } else {
                    toast.error('Vui lòng chọn lớp với nhóm thực hành hợp lệ.');
                }
            }
        } catch (error) {
            console.error('Failed to register course:', error);
            toast.error('Đăng ký không thành công, vui lòng thử lại. Error: ' + error);
        }
    };

    const handleViewClick = (id) => {
        const course = detailedCourse.filter(course => course.courseClassID.courseClassId === id);
        console.log('detailedCourse:', detailedCourse);
        console.log('Selected course:', course);
        setModalCourse(course);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalCourse(null);
    };

    return (
        <div>
            {currentUser && (
                <div className="container bg-light card" style={{ marginTop: 80, zIndex: 20 }}>
                    <h4>Đăng ký học phần</h4>
                    <div className="border-bottom w-100 my-3"></div>
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <BasicSelect onValueChange={handleValueChange} />
                        </div>
                        <div className="col-4">
                            <RowRadioButtonsGroup onValueChange={setRadioValue} />
                        </div>
                    </div>

                    <div className="my-4"></div>
                    <h6 className='text-primary'>Môn học/học phần đang chờ đăng ký</h6>
                    <div className="table-responsive">
                        <table className="table-pointer table-custom table table-bordered text-center" width="100%" role="grid" id="dkHocPhan">
                            <thead>
                                <tr role="row">
                                    <td style={{ marginRight: '10px' }}></td>
                                    <th lang="dkhp-stt">STT</th>
                                    <th lang="dkhp-malhp">Mã học phần</th>
                                    <th lang="dkhp-tenmh">Tên môn học/học phần</th>
                                    <th lang="dkhp-tc">TC</th>
                                    <th lang="dkhp-batbuoc">Bắt buộc</th>
                                    <th lang="dkhp-hoctruoctienquyetsonghanh">
                                        học phần: học trước (a),
                                        <br />
                                        tiên quyết (b),
                                        <br />
                                        song hành (c)
                                    </th>
                                    {radioValue === 'hoc cai thien' && <th>Học Lại</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length > 0 ? (
                                    courses.map((course, index) => (
                                        <tr
                                            key={`${course.courseClassID.courseClassId}-${index}`}
                                            onClick={() => SelectMonHocChoDangKy(course.courseClassID.courseID.courseId)}
                                            data-id={course.id}
                                            data-mamh={course.courseClassID.courseID.courseId}
                                            data-mahpduochoc={course.courseClassID.courseID.courseId}
                                        >
                                            <td className="text-center">
                                                <div>
                                                    <label className="mt-radio" style={{ paddingLeft: '17px' }}>
                                                        <input
                                                            id="rdoMonHocChoDangKy"
                                                            name="rdoMonHocChoDangKy"
                                                            type="radio"
                                                            value={course.courseClassID.courseID.courseId}
                                                            checked={selectedRow === course.courseClassID.courseID.courseId}
                                                            onChange={() => setSelectedRow(course.courseClassID.courseID.courseId)}
                                                        />
                                                        <span></span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{course.courseClassID.courseID.courseId}</td>
                                            <td className="text-left">{course.courseClassID.courseID.courseName}</td>
                                            <td>{course.courseClassID.courseID.credits}</td>
                                            <td>
                                                <div>
                                                    <div className="no-check"></div>
                                                </div>
                                            </td>
                                            <td>
                                            </td>
                                            {radioValue === 'hoc cai thien' && <td>{course.options === 'hoc cai thien' ? 'Yes' : 'No'}</td>}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={radioValue === 'hoc cai thien' ? 8 : 7}>Không có dữ liệu</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* danh sách các lớp của các môn học đã chọn */}
                    <div className="row mt-4" id="">
                        <div className="col-md-6" id="lopHPDangKy">
                            <div className="gr-table">
                                <div className="border-scroll overflow-auto outline-none" style={{ maxHeight: '570px' }} tabIndex="1">
                                    <div id="box_lophocphan_chodangky">
                                        <h3 className="title-table" lang="lhpchodangky-tabletitle">Lớp học phần chờ đăng ký</h3>
                                        <div className="text-right mb-4 mt-4">
                                            {/* <label>
                                                <input id="checkLichTrung" name="checkLichTrung" type="checkbox" value="true" />
                                                <input name="checkLichTrung" type="hidden" value="false" />
                                                <b>
                                                    <span className="text-uppercase text-danger ms-2 me-3" lang="lhpchodangky-lhpkhongtrunglich">HIỂN THỊ LỚP học phần KHÔNG TRÙNG LỊCH</span>
                                                </b>
                                            </label> */}
                                        </div>
                                        <div className="table-responsive">
                                            <table id="table_lhpchodangky" className="table-pointer table-dkhp table-custom table table-bordered text-center no-footer dtr-inline" width="100%" role="grid">
                                                <thead>
                                                    <tr role="row">
                                                        <th lang="sv-stt">STT</th>
                                                        <th lang="dkhp-thongtinlhp">Thông tin lớp học phần</th>
                                                        <th lang="dkhp-dadangky">Đã đăng ký</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedCourse.length > 0 ? (
                                                        selectedCourse.map((course, index) => (
                                                            <tr key={`${course.courseClassID.courseClassId}-${index}`}
                                                                className={`${selectedRowClass === course.courseClassID.courseClassId ? 'table-active' : ''}`}
                                                                onClick={() => SelectLopHocChoDangKy(course.courseClassID.courseClassId)}>
                                                                <td style={{ width: '40px' }}>{index + 1}</td>
                                                                <td className="text-left">
                                                                    <div className="name">{course.courseClassID.courseID.courseName}</div>
                                                                    <div>
                                                                        <span>Trạng thái</span>: {statusMapping[course.courseClassID.status]}
                                                                        <br />
                                                                        <span>Mã lớp học phần</span>: {course.courseClassID.courseClassId} - {course.courseClassID.shortName}
                                                                    </div>
                                                                </td>
                                                                <td>{course.maxStudents}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={3}>Không có dữ liệu</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" id="thongtinchitietHPDangKy">
                            <div className="gr-table">
                                <div className="border-scroll" tabIndex="2" style={{ overflow: 'hidden', outline: 'none' }}>
                                    <div id="box_chitietlophocphan_chodangky">
                                        <h3 className="title-table" lang="ctlhpchodangky-tabletitle">Chi tiết lớp học phần</h3>
                                        <div className="text-right">
                                            {/* <button onClick={handleRegisterClick} className="btn btn--m block first" style={{ backgroundColor: '#ec9e0f', color: '#fff' }} lang="dkhp-xemlichtrungButton">Đăng ký</button> */}
                                        </div>
                                        <table id="tbChiTietDKHP" className="table table-bordered text-center" role="grid" style={{ marginTop: '22px' }}>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <p><span lang="dkhp-trangthai">Lịch học</span></p>
                                                    </th>
                                                    <th>
                                                        <p><span lang="dkhp-sisomax">Nhóm</span></p>
                                                    </th>
                                                    <th>
                                                        <p><span lang="dkhp-sisomax">Thông tin</span></p>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedClass && selectedClass.length > 0 ? (
                                                    selectedClass.map((course, index) => (
                                                        <tr key={`${course.id}-${index}`} onClick={() => handleClassClick(course.id)} className={`${index === 0 || (clickedClass && clickedClass.id === course.id) ? 'table-active' : ''}`}>
                                                            <td className="text-left">
                                                                <div><span lang="dkhp-lichhoc">Lịch học</span>:- Thứ {course.dayOfWeek} (Tiết {course.fromLessonTime}-{course.toLessonTime}) </div>
                                                                <p><span lang="dkhp-phong">Phòng</span>: <b>{course.room}</b></p>
                                                            </td>
                                                            <td>
                                                                <div><span lang="dkhp-sisomax"></span>{course.groupPractice}</div>
                                                            </td>
                                                            <td className="text-left">
                                                                <div className="name"><span lang="dkhp-gv">GV</span>: {course.teacherName}</div>
                                                                <div><span lang="dkhp-lichhoc"><b>{course.fromDate} - {course.toDate}</b> </span></div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={3}>Không có dữ liệu</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="text-center has-2btn">
                                            <button onClick={handleRegisterClick} className="btn btn--m block first" style={{ backgroundColor: '#0190F3', color: '#fff', width: 100 }} lang="dkhp-dangkyButton">Đăng ký</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* danh sách các lớp học phần đã đăng ký */}
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="gr-table">
                                <h3 className="title-table">Lớp học phần đã đăng ký</h3>
                                <div className="table-responsive">
                                    <table className="table table-bordered text-center" width="100%" role="grid">
                                        <thead>
                                            <tr role="row">
                                                <th>Thao tác</th>
                                                <th>STT</th>
                                                <th>Mã học phần</th>
                                                <th>Tên môn học/học phần</th>
                                                <th>TC</th>
                                                <th>Trạng thái</th>
                                                <th>Mã lớp học phần</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {registeredCourses.length > 0 ? (
                                                registeredCourses.map((course, index) => (
                                                    <tr key={`${course.courseClassID.courseClassId}-${index}`}>
                                                        <td><button className="btn btn--m block first" style={{ backgroundColor: '#0190F3', color: '#fff' }} onClick={() => handleViewClick(course.courseClassID.courseClassId)}>Xem</button></td>
                                                        <td>{index + 1}</td>
                                                        <td>{course.courseClassID.courseID.courseId}</td>
                                                        <td className="text-left">{course.courseClassID.courseID.courseName}</td>
                                                        <td>{course.courseClassID.courseID.credits}</td>
                                                        <td>{statusMapping[course.courseClassID.status]}</td>
                                                        <td>{course.courseClassID.courseClassId}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={7}>Không có dữ liệu</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {modalCourse && (
                <Modal
                    show={showModal}
                    onHide={handleCloseModal}
                    dialogClassName="custom-modal"
                    centered // This will center the modal vertically
                    size="lg" // This will set the modal size
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết lớp học</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
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
                                {modalCourse.map((course, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>Thứ {course.dayOfWeek} (Tiết {course.fromLessonTime} - {course.toLessonTime})</td>
                                        <td>{course.groupPractice}</td>
                                        <td>{course.room}</td>
                                        <td>{course.teacherName}</td>
                                        <td>{course.fromDate} - {course.toDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default RegisterCoursePage;
