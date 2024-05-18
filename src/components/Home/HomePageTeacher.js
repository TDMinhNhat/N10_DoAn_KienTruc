import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';

import studentService from '../../services/student.service';

const statusMapping = {
    'ACTIVE': 'Hoạt động',
    'HIBERNATE': 'Nghỉ dạy',
    'DELETED': 'Đã xóa',
};
const teacherLevelMapping = {
    'BACHELOR': 'Cử nhân',
    'MASTER': 'Thạc sĩ',
    'DOCTOR': 'Tiến sĩ',
    'PROFESSOR': 'Giáo sư',
};

const HomePageTeacher = ({ currentUser }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!currentUser) {
                navigate('/');
            } else {
                console.log(`Fetching data from /api/student-info/get-personal-info/${currentUser.data.person.id}`);
                const response = await studentService.getPersonalInfo(currentUser.data.person.id);
                setUserInfo(response.data);
                console.log('check', response.data);
            }
            console.log('check cu', currentUser);
        }
        fetchData();
    }, [currentUser, navigate]);
    return (
        <div>
            {userInfo && userInfo.data && userInfo.data.data && (
                <div className="container" style={{ marginTop: 80, zIndex: 20 }}>
                    <div className="col">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card bg-light text-black p-4 d-flex align-items-start">
                                    <div className="d-flex flex-column align-items-center">
                                        <h1>Thông tin giảng viên</h1>
                                    </div>
                                    <div className="border-bottom w-100 my-3"></div>
                                    <div className='row col-md-12'>
                                        <div className="col-md-4 d-flex flex-column align-items-center">
                                            <img
                                                src={userInfo.data.data.avatar}
                                                alt="Brand Logo"
                                                className="img-fluid mb-3"
                                                style={{ maxHeight: '150px', borderRadius: '50%' }}
                                            />
                                            <Link className="text-decoration-none text-blue" to="/profile">Xem chi tiết</Link>
                                        </div>
                                        <div className='col-md-8'>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p><span className="fw-bold">MSGV:</span> {userInfo.data.data.id}</p>
                                                    <p><span className="fw-bold">Họ tên:</span> {userInfo.data.data.fullName}</p>
                                                    <p><span className="fw-bold">Giới tính:</span> {userInfo.data.data.sex ? 'Nam' : 'Nữ'}</p>
                                                    <p><span className="fw-bold">Ngày sinh:</span> {userInfo.data.data.birthDay}</p>
                                                    <p><span className="fw-bold">Nơi sinh:</span> {userInfo.data.data.cityBorn}</p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p><span className="fw-bold">Email:</span> {userInfo.data.data.email}</p>
                                                    <p><span className="fw-bold">Số điện thoại:</span> {userInfo.data.data.phoneNumber}</p>
                                                    <p><span className="fw-bold">Trạng thái:</span> {statusMapping[userInfo.data.data.status]}</p>
                                                    <p><span className="fw-bold">Trình độ:</span> {teacherLevelMapping[userInfo.data.data.teacherLevel]}</p>
                                                    <p><span className="fw-bold">Ngành:</span> {userInfo.data.data.facultyID.facultyName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card bg-light text-black p-4">
                                            <h1>Home Page</h1>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <div className="card bg-info text-white h-100 d-flex align-items-stretch">
                                            <button type="button" className="btn btn-info d-flex flex-column align-items-center w-100 h-100">
                                                <CalendarMonthOutlinedIcon />
                                                <span>Lịch học trong tuần</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <div className="card text-white h-100 d-flex align-items-stretch">
                                            <button type="button" className="btn btn-warning d-flex flex-column align-items-center w-100 h-100">
                                                <CalendarMonthOutlinedIcon />
                                                <span>Lịch thi trong tuần</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <div className="card">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/weekly-schedule" className="stretched-link d-flex flex-column align-items-center text-decoration-none">
                                            <CalendarMonthOutlinedIcon />
                                            <span>Lịch theo tuần</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/study-results" className="stretched-link d-flex flex-column align-items-center text-decoration-none">
                                            <EqualizerOutlinedIcon />
                                            <span>Danh sách lớp</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/input-point" className="stretched-link d-flex flex-column align-items-center text-decoration-none">
                                            <StorageOutlinedIcon />
                                            <span>Nhập điểm</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePageTeacher;
