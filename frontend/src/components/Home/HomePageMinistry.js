import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import ministryService from '../../services/ministry.service';


const HomePageMinistry = ({ currentUser }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!currentUser) {
                navigate('/');
            } else {
                // console.log(`Fetching data from /api/student-info/get-personal-info/${currentUser.data.person.id}`);
                const response = await ministryService.getPersonalInfo(currentUser.data.person.id);
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
                            <div className="col-md-12">
                                <div className="card bg-light text-black p-4 d-flex align-items-start">
                                    <div className="d-flex flex-column align-items-center">
                                        <h1>Thông tin giáo vụ</h1>
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
                                                    <p><span className="fw-bold">Ngành:</span> {userInfo.data.data.facultyID.facultyName}</p>
                                                    <p><span className="fw-bold">Số điện thoại:</span> {userInfo.data.data.phoneNumber}</p>
                                                    <p><span className="fw-bold">Email:</span> {userInfo.data.data.email}</p>
                                                    <p><span className="fw-bold">Địa chỉ:</span> {userInfo.data.data.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {/* <div className="row">
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
                                </div> */}
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <div className="card">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/management/students" className="stretched-link d-flex flex-column align-items-center text-decoration-none">
                                            <CalendarMonthOutlinedIcon />
                                            <span>Quản lý sinh viên</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/management/teachers" className="stretched-link d-flex flex-column align-items-center text-decoration-none">
                                            <EqualizerOutlinedIcon />
                                            <span>Quản lý giảng viên</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/management/subject" className="stretched-link d-flex flex-column align-items-center text-decoration-none">
                                            <StorageOutlinedIcon />
                                            <span>Quản lý môn học</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/register-course" className="stretched-link d-flex flex-column align-items-center text-decoration-none">
                                            <StorageOutlinedIcon />
                                            <span>Quản lý học phần</span>
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

export default HomePageMinistry;
