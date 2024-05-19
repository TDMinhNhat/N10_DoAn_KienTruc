import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicSelect from './components/BasicSelect';
import RowRadioButtonsGroup from './components/RowRadioButtonsGroup';
import StudentService from '../../services/student.service';

const statusMappping = {
    PLANNING: 'Đang lên kế hoạch',
    REGISTERED: 'Đã đăng ký',
    ACCEPTED: 'Đã chấp nhận',
    LOCKED: 'Đã khóa',
    REJECTED: 'Đã từ chối',
};

const RegisterCoursePage = ({ currentUser }) => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);
    const [radioValue, setRadioValue] = useState('hoc moi');
    const [selectedYear, setSelectedYear] = useState('2020-2021');
    const [selectedSemester, setSelectedSemester] = useState('HK1');
    const [courses, setCourses] = useState([]);
    const [semesterCourses, setSemesterCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);

    const handleValueChange = (value) => {
        const [semester, year] = value.split(' ');
        setSelectedYear(year.slice(1, -1)); // Remove the parentheses
        setSelectedSemester(semester);
        setSelectedRow(null);
        setSelectedCourse([]);
        setSelectedClass(null);
        
    };

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        } else {
            fetchCourses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, selectedYear, selectedSemester]);

    const fetchCourses = async () => {
        try {
            const facultyID = currentUser.data.person.facultyID;
            const formattedYear = selectedYear.replace("-", " - ");
            const response = await StudentService.getBySemesterYear(currentUser.data.person.id, formattedYear, facultyID);
            console.log(`Fetching data from ${currentUser.data.person.id}, ${formattedYear}, ${facultyID}`);
            if (response.status === 200) {
                const allCourses = response.data.data.data;
                console.log('All courses:', allCourses);
                const selectedSemesterNumber = parseInt(selectedSemester.slice(2), 10); // Get the number after "HK" and convert it to a number
                const semesterCourses = allCourses.filter(course => course.courseClassID.semester === selectedSemesterNumber);
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
        console.log('Selected course ID:', courseId);
        console.log('Selected courses:', selectedCourses);
        setSelectedRow(courseId);
        setSelectedCourse(selectedCourses);
    };

    const SelectLopHocChoDangKy = (id) => {
        const selectedClass = semesterCourses.find(course => course.id === id);
        console.log('Selected class ID:', id);
        console.log('Selected class:', selectedClass);
        setSelectedClass(selectedClass);
    };
    

    const XemChiTietLichHoc = (id) => {
        console.log('Selected course details ID:', id);
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
                                            key={course.id}
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
                                            <label>
                                                <input id="checkLichTrung" name="checkLichTrung" type="checkbox" value="true" />
                                                <input name="checkLichTrung" type="hidden" value="false" />
                                                <b>
                                                    <span className="text-uppercase text-danger ms-2 me-3" lang="lhpchodangky-lhpkhongtrunglich">HIỂN THỊ LỚP học phần KHÔNG TRÙNG LỊCH</span>
                                                </b>
                                            </label>
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
                                                            <tr key={course.id} className="tr-active" onClick={() => SelectLopHocChoDangKy(course.id)}>
                                                                <td style={{ width: '40px' }}>{index + 1}</td>
                                                                <td className="text-left">
                                                                    <div className="name">{course.courseClassID.courseID.courseName}</div>
                                                                    <div>
                                                                        <span>Trạng thái</span>: {statusMappping[course.courseClassID.status]}
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
                                        <div className="text-right" style={{ marginBottom: '5px' }}>
                                            <button onClick={() => console.log('Button clicked!')} className="btn btn--m block first" style={{ backgroundColor: '#ec9e0f', color: '#fff' }} lang="dkhp-xemlichtrungButton">Xem lịch trùng</button>
                                        </div>
                                        <table id="tbChiTietDKHP" className="table table-bordered text-center" role="grid">
                                            <thead>
                                                {selectedClass && (
                                                    <tr key={selectedClass.id}>
                                                        <th>
                                                            <p><span lang="dkhp-trangthai">Trạng thái</span>: <span className="red-bold">{selectedClass.courseClassID && statusMappping[selectedClass.courseClassID.status]}</span></p>
                                                        </th>
                                                        <th>
                                                            <p>
                                                                <span><span lang="dkhp-sisomax">Sĩ số tối đa</span>: {selectedClass.maxStudents}</span>
                                                            </p>
                                                        </th>
                                                    </tr>
                                                )}

                                            </thead>
                                            <tbody>
                                                {selectedClass && (
                                                    <tr key={selectedClass.id} >
                                                        <td className="text-left">
                                                            <div><span lang="dkhp-lichhoc">Lịch học</span>:- Thứ {selectedClass.dayOfWeek} (Tiết {selectedClass.fromLessonTime}-{selectedClass.toLessonTime}) </div>
                                                            <p><span lang="dkhp-phong">Phòng</span>: <b>{selectedClass.room}</b></p>
                                                        </td>
                                                        <td className="text-left">
                                                            <div className="name"><span lang="dkhp-gv">GV</span>: {selectedClass.teacherId}</div>
                                                            <div><span lang="dkhp-lichhoc"><b>{selectedClass.fromDate} - {selectedClass.toDate}</b> </span></div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="text-center has-2btn">
                                            <button onClick={() => console.log('Button clicked!')} className="btn btn--m block first" style={{ backgroundColor: '#0190F3', color: '#fff', width: 100 }} lang="dkhp-dangkyButton">Đăng ký</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterCoursePage;

