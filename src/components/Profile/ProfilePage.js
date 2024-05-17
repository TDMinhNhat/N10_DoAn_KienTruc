import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
        console.log('check cu', currentUser);
    }, [currentUser, navigate]);

    return (
        <div>
            {currentUser && (
                <div className="container " style={{ marginTop: 80,zIndex:20  }}>
                    <div className="card bg-light text-black p-4">
                        <div className='row'>
                            <div className="col-md-4 d-flex flex-column align-items-center ">
                                <img
                                    src={currentUser.data.person.avatar}
                                    alt="Brand Logo"
                                    className="img-fluid mb-3"
                                    style={{ maxHeight: '150px', borderRadius: '50%' }}
                                />
                                <div style={{ marginLeft: '-220px' }}>
                                    <p>MSSV: {currentUser.data.person.id}</p>
                                    <p>Họ tên: {currentUser.data.person.fullName}</p>
                                    <p>Giới tính: {currentUser.data.person.sex ? 'Nam' : 'Nữ'}</p> 
                                </div>
                            </div>
                            <div className='col-md-8'>
                                <h3>Thông tin học vấn</h3>
                                <hr></hr>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <p>Trạng thái: Đang học</p>
                                        <p>Lớp học: {currentUser.data.person.class}</p>
                                        <p>Bậc đào tạo: {levelMapping[currentUser.data.person.level]}</p>
                                        <p>Khoa: </p>
                                        <p>Chuyên ngành:</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>Ngày vào trường: {currentUser.data.person.dateEnrolled}</p>
                                        <p>Cơ sở: Cơ sở 1 (Thành phố Hồ Chí Minh)</p>
                                        <p>Loại hình đào tạo: {educationTypeMapping[currentUser.data.person.type]}</p>
                                        <p>Ngành: {currentUser.data.person.facultyID}</p>
                                        <p>Khóa học: {currentUser.data.person.courseYear}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-md-12'>
                                <h3>Thông tin cá nhân</h3>
                                <hr></hr>
                                <p>Ngày sinh: {currentUser.data.person.birthDay}</p>
                                <p>Nơi sinh: {currentUser.data.person.cityBorn}</p>
                                <p>Địa chỉ liên hệ: {currentUser.data.person.address}</p>
                                <p>Số điện thoại: {currentUser.data.person.phoneNumber}</p>
                                <p>Email: {currentUser.data.person.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Profile;
