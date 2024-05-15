import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicSelect from './components/BasicSelect';
import RowRadioButtonsGroup from './components/RowRadioButtonsGroup';
import { courses, registerCourses, registerClasses } from './FakeData.ts';


const RegisterCoursePage = ({ currentUser }) => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null)
    const [radioValue, setRadioValue] = useState('hoc moi');

    // Assume we have a state for the selected year and semester
    const [selectedYear, setSelectedYear] = useState('2020-2021');
    const [selectedSemester, setSelectedSemester] = useState('HK1');
    const handleValueChange = (value) => {
        // Assuming the value is in the format "HK1 (2021-2022)"
        const [semester, year] = value.split(' ');

        setSelectedYear(year.slice(1, -1)); // Remove the parentheses
        setSelectedSemester(semester);
    };

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    // Thêm trạng thái mới để theo dõi môn học được chọn
    const [selectedCourse, setSelectedCourse] = useState(null);
    // Cập nhật hàm SelectMonHocChoDangKy để cập nhật môn học được chọn
    const SelectMonHocChoDangKy = (name) => {
        const selectedCourses = registerCourses.filter(course => course.name === name);
        setSelectedCourse(selectedCourses);
        console.log('check:', name);
        console.log('check 2:', selectedCourses);
    }
    // Thêm trạng thái mới để theo dõi lớp học hiện tại được chọn
    const [selectedClass, setSelectedClass] = useState(null);

    // Cập nhật hàm SelectLopHocChoDangKy để cập nhật lớp học được chọn
    const SelectLopHocChoDangKy = (id) => {
        const selectedClass = registerCourses.find(course => course.id === id);
        setSelectedClass(selectedClass);
        console.log('check 2:', id);
    }

    const SelectHocPhanDaDangKy = (id) => {
        console.log('check:', id);
    }

    const XemChiTietLichHoc = (id) => {
        console.log('check:', id);
    }

    return (
        <div>
            {currentUser && (
                <div className="container bg-light mt-4 card">
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

                    {/* Danh sach dang ky */}
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
                                {courses.filter(course => {
                                    // Filter based on the selected year and semester
                                    const isYearMatch = selectedYear ? course.year === selectedYear : true;
                                    const isSemesterMatch = selectedSemester ? course.HK === selectedSemester : true;

                                    // Filter based on the radio button value
                                    const isOptionMatch = radioValue ? course.options === radioValue : true;

                                    return isYearMatch && isSemesterMatch && isOptionMatch;
                                }).map((course, index) => (
                                    <tr
                                        key={course.id}
                                        onClick={() => {
                                            SelectMonHocChoDangKy(course.name);
                                            setSelectedRow(course.id);
                                        }}
                                        data-id={course.id}
                                        data-mamh={course.code}
                                        data-mahpduochoc={course.code}
                                    >
                                        <td className="text-center">
                                            <div>
                                                <label className="mt-radio" style={{ paddingLeft: '17px' }}>
                                                    <input
                                                        id="rdoMonHocChoDangKy"
                                                        name="rdoMonHocChoDangKy"
                                                        type="radio"
                                                        value={course.id}
                                                        checked={selectedRow === course.id}
                                                        onChange={() => setSelectedRow(course.id)}
                                                    />
                                                    <span></span>
                                                </label>
                                            </div>
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{course.code}</td>
                                        <td className="text-left">{course.name}</td>
                                        <td>{course.credits}</td>
                                        <td>
                                            <div>
                                                <div className="no-check"></div>
                                            </div>
                                        </td>
                                        <td>
                                        </td>
                                        {radioValue === 'hoc cai thien' && <td>{course.options === 'hoc cai thien' ? 'Yes' : 'No'}</td>} {/* Conditional rendering of the column */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mon hoc cho dang ky */}
                    <div className="row mt-4" id="">
                        <div className="col-md-6" id="lopHPDangKy">
                            <div className="gr-table">
                                <div className="border-scroll overflow-auto outline-none" style={{ maxHeight: '570px' }} tabindex="1">                                    <div id="box_lophocphan_chodangky">
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
                                                {selectedCourse && selectedCourse.map((course, index) => (
                                                    <tr key={course.id} className="tr-active" onClick={() => SelectLopHocChoDangKy(course.id)}>
                                                        <td style={{ width: '40px' }}>{index + 1}</td>
                                                        <td className="text-left">
                                                            <div className="name">{course.name}</div>
                                                            <div>
                                                                <span>Trạng thái</span>: <span className={course.status === 'open' ? 'cl-green' : 'cl-red'}>{course.status}</span>
                                                                <span>Mã lớp học phần</span>: {course.code} - {course.className}
                                                            </div>
                                                        </td>
                                                        <td>{course.student} / {course.maxStudent}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" id="thongtinchitietHPDangKy">
                            <div className="gr-table">
                                <div className="border-scroll" tabindex="2" style={{ overflow: 'hidden', outline: 'none' }}>
                                    <div id="box_chitietlophocphan_chodangky">
                                        <h3 className="title-table" lang="ctlhpchodangky-tabletitle">Chi tiết lớp học phần</h3>
                                        <div className="text-right" style={{ marginBottom: '5px' }}>
                                            <button onClick="XemLichTrung(this)" className="btn btn--m block first" style={{ backgroundColor: '#ec9e0f', color: '#fff' }} lang="dkhp-xemlichtrungButton">Xem lịch trùng</button>
                                        </div>
                                        <table id="tbChiTietDKHP" className="table table-bordered text-center" role="grid">
                                            <thead>
                                                {selectedClass && (
                                                    <tr key={selectedClass.id}>
                                                        <th>
                                                            <p><span lang="dkhp-trangthai">Trạng thái</span>: <span className="red-bold">{selectedClass.status}</span></p>
                                                        </th>
                                                        <th>
                                                            <p>
                                                                <span><span lang="dkhp-sisomax">Sĩ số tối đa</span>: {selectedClass.maxStudent}</span>
                                                            </p>
                                                        </th>
                                                    </tr>
                                                )}
                                            </thead>
                                            <tbody>
                                                {selectedClass && (
                                                    <tr key={selectedClass.id} >
                                                        <td className="text-left">
                                                            <div><span lang="dkhp-lichhoc">Lịch học</span>: <b>{selectedClass.type} - {selectedClass.time}</b></div>
                                                            <p><span lang="dkhp-phong">Phòng</span>: <b>{selectedClass.room}</b></p>
                                                        </td>
                                                        <td className="text-left">
                                                            <div className="name"><span lang="dkhp-gv">GV</span>: {selectedClass.teacher}</div>
                                                            <div><span lang="dkhp-ngaybd"></span>{selectedClass.date}</div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="text-center has-2btn">
                                            <button onclick="DangKyHocPhan(this)" className="btn btn--m block first" style={{ backgroundColor: '#0190F3', color: '#fff', width: 100 }} lang="dkhp-dangkyButton">Đăng ký</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hoc phan da dang ky */}
                    <div className='my-4'></div>
                    <h6 className='text-primary'>Lớp HP đã đăng ký trong học kỳ này</h6>
                    <div className="table-responsive">
                        <table className="table-pointer table-custom table table-bordered text-center" width="100%" role="grid" id="dkHocPhan">
                            <thead>
                                <tr role="row">
                                    <th lang="dangkyhocphan-thaotac">Thao tác</th>
                                    <th lang="dangkyhocphan-stt">STT</th>
                                    <th lang="dangkyhocphan-dadangkymalhp">Mã lớp  HP</th>
                                    <th lang="dangkyhocphan-tenmh">Tên môn học/HP</th>
                                    <th lang="dangkyhocphan-dadangkylopdukien">Lớp học dự kiến</th>
                                    <th lang="dangkyhocphan-tc">TC</th>
                                    <th lang="dangkyhocphan-nhomth">Nhóm TH</th>
                                    <th lang="dangkyhocphan-trangthaidangky">Trạng thái ĐK</th>
                                    <th lang="dangkyhocphan-ngaydangky">Ngày ĐK</th>
                                    <th lang="dangkyhocphan-trangthailhp">TT lớp HP </th>
                                </tr>
                            </thead>
                            <tbody>
                                {registerClasses
                                    .filter(classItem => classItem.Year === selectedYear && classItem.HK === selectedSemester)
                                    .map((classItem, index) => (
                                        <tr key={classItem.id} onClick={() => SelectHocPhanDaDangKy(classItem.id)}>
                                            <td>
                                                <button className="btn btn-primary w-full text-nowrap" onClick={(e) => { e.stopPropagation(); XemChiTietLichHoc(classItem.id) }}>Xem lịch</button>
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{classItem.code}</td>
                                            <td className="text-left">{classItem.name}</td>
                                            <td>{classItem.className}</td>
                                            <td>{classItem.credits}</td>
                                            <td>{classItem.group}</td>
                                            <td>{classItem.status}</td>
                                            <td>{classItem.date}</td>
                                            <td>{classItem.registerStatus}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            )
            }
        </div >
    )
}

export default RegisterCoursePage