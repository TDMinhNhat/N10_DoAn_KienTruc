import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../../services/student.service';

const levelMapping = {
    'COLLEGE': 'Cao đẳng',
    'UNIVERSITY': 'Đại học',
    'POSTGRADUATE': 'Sau đại học'
};

const educationTypeMapping = {
    'FORMAL': 'Chính quy',
    'HIGH_QUALITY': 'Chất lượng cao',
};

const Profile = ({ currentUser }) => {
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
                <div className="container " style={{ marginTop: 80, zIndex: 20 }}>
                    <div className="card bg-light text-black p-4">
                        <div className='row'>
                            <div className="col-md-4 d-flex flex-column align-items-center ">
                                <img
                                    src={userInfo.data.data.avatar}
                                    alt="Brand Logo"
                                    className="img-fluid mb-3"
                                    style={{ maxHeight: '150px', borderRadius: '50%' }}
                                />
                                <div style={{ marginLeft: '-220px' }}>
                                    <p><span className="fw-bold">MSSV:</span> {userInfo.data.data.id}</p>
                                    <p><span className="fw-bold">Họ tên:</span> {userInfo.data.data.fullName}</p>
                                    <p><span className="fw-bold">Giới tính:</span> {userInfo.data.data.sex ? 'Nam' : 'Nữ'}</p>
                                </div>
                            </div>
                            <div className='col-md-8'>
                                <h3>Thông tin học vấn</h3>
                                <hr></hr>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <p><span className="fw-bold">Trạng thái:</span> Đang học</p>
                                        <p><span className="fw-bold">Lớp học:</span>  {userInfo.data.data.clazz}</p>
                                        <p><span className="fw-bold">Bậc đào tạo:</span>  {levelMapping[userInfo.data.data.level]}</p>
                                        <p><span className="fw-bold">Khoa:</span>  {userInfo.data.data.facultyID.department.departmentName} </p>
                                        <p><span className="fw-bold">Chuyên ngành:</span>  {userInfo.data.data.facultyID.facultyName}</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p><span className="fw-bold">Ngày vào trường:</span>  {userInfo.data.data.dateEnrolled}</p>
                                        <p><span className="fw-bold">Cơ sở:</span>  Cơ sở 1 (Thành phố Hồ Chí Minh)</p>
                                        <p><span className="fw-bold">Loại hình đào tạo:</span>  {educationTypeMapping[userInfo.data.data.type]}</p>
                                        <p><span className="fw-bold">Ngành:</span>  {userInfo.data.data.facultyID.facultyName}</p>
                                        <p><span className="fw-bold">Khóa học: </span> {userInfo.data.data.courseYear}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-md-12'>
                                <h3>Thông tin cá nhân</h3>
                                <hr></hr>
                                <p><span className="fw-bold">Ngày sinh:</span> {userInfo.data.data.birthDay}</p>
                                <p><span className="fw-bold">Nơi sinh:</span> {userInfo.data.data.cityBorn}</p>
                                <p><span className="fw-bold">Địa chỉ liên hệ:</span> {userInfo.data.data.address}</p>
                                <p><span className="fw-bold">Số điện thoại:</span> {userInfo.data.data.phoneNumber}</p>
                                <p><span className="fw-bold">Email:</span> {userInfo.data.data.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Profile;
