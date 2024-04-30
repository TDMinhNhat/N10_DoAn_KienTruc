import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import UpcomingOutlinedIcon from '@mui/icons-material/UpcomingOutlined';

const HomePage = ({ currentUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
        console.log('check cu', currentUser);
    }, [currentUser, navigate]);

    return (
        <div>
            {currentUser && (
                <div className="container">
                    <div className="col">
                        <div className="row mt-4">
                            <div className="col-md-8">
                                <div className="card bg-light text-black p-4 d-flex align-items-start">
                                    <div className="d-flex flex-column align-items-center">
                                        <h1>Thông tin sinh viên</h1>
                                    </div>
                                    <div className="border-bottom w-100 my-3"></div>
                                    <div className='row'>
                                        <div className="col-4 d-flex flex-column align-items-center">
                                            <img
                                                src={currentUser.user.avatar}
                                                alt="Brand Logo"
                                                className="img-fluid mb-3"
                                                style={{ maxHeight: '150px', borderRadius: '50%' }}
                                            />
                                            <Link className="text-decoration-none text-blue" to="/profile">Xem chi tiết</Link>
                                        </div>
                                        <div className='col-8'>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <p>MSSV: {currentUser.user.id}</p>
                                                    <p>Họ tên: {currentUser.user.fullName}</p>
                                                    <p>Giới tính: {currentUser.user.sex}</p>
                                                    <p>Ngày sinh: {currentUser.user.birthDay}</p>
                                                    <p>Nơi sinh: {currentUser.user.cityBorn}</p>
                                                </div>
                                                <div className='col-6'>
                                                    <p>Lớp học: {currentUser.user.class}</p>
                                                    <p>Khóa học: {currentUser.user.courseYear}</p>
                                                    <p>Bậc đào tạo: {currentUser.user.educationLevel}</p>
                                                    <p>Loại hình đào tạo: {currentUser.user.educationType}</p>
                                                    <p>Ngành: {currentUser.user.facultyID}</p>
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
                                            <CalendarMonthOutlinedIcon />
                                            <span>Kết quả học tập</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/register-course" className="stretched-link d-flex flex-column align-items-center text-decoration-none">
                                            <CalendarMonthOutlinedIcon />
                                            <span>Đăng ký học phần</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/home" className="stretched-link d-flex flex-column align-items-center text-decoration-none">
                                            <CalendarMonthOutlinedIcon />
                                            <span>Lịch theo tiến độ</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/home" className="stretched-link d-flex flex-column align-items-center text-decoration-none">
                                            <CalendarMonthOutlinedIcon />
                                            <span>Nhắc nhở</span>
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

export default HomePage;
