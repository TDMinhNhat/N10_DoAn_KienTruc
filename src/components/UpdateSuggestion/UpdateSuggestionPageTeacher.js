import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import teacherService from '../../services/teacher.service';
import { toast } from 'react-toastify';

const UpdateSuggestionPageReacher = ({ currentUser }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState({
        id: '',
        fullName: '',
        sex: '',
        birthDay: '',
        cityBorn: '',
        address: '',
        phoneNumber: '',
        email: ''
    });

    const [errorMessages, setErrorMessages] = useState({
        birthDay: '',
        cityBorn: '',
        address: '',
        phoneNumber: '',
        email: ''
    });

    const defaultObjCheckInput = {
        birthDay: true,
        cityBorn: true,
        address: true,
        phoneNumber: true,
        email: true
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultObjCheckInput);

    const inputRefs = {
        birthDay: useRef(),
        cityBorn: useRef(),
        address: useRef(),
        phoneNumber: useRef(),
        email: useRef()
    };

    const isValidInputs = () => {
        let isValid = true;
        const newErrorMessages = { ...errorMessages };
        const newObjCheckInput = { ...objCheckInput };

        if (user.birthDay === '') {
            newObjCheckInput.birthDay = false;
            inputRefs.birthDay.current.focus();
            newErrorMessages.birthDay = 'Ngày sinh không được để trống';
            isValid = false;
        }
        if (user.cityBorn === '') {
            newObjCheckInput.cityBorn = false;
            inputRefs.cityBorn.current.focus();
            newErrorMessages.cityBorn = 'Nơi sinh không được để trống';
            isValid = false;
        }
        if (user.address === '') {
            newObjCheckInput.address = false;
            inputRefs.address.current.focus();
            newErrorMessages.address = 'Địa chỉ không được để trống';
            isValid = false;
        }
        if (user.phoneNumber === '') {
            newObjCheckInput.phoneNumber = false;
            inputRefs.phoneNumber.current.focus();
            newErrorMessages.phoneNumber = 'Số điện thoại không được để trống';
            isValid = false;
        }
        if (user.email === '') {
            newObjCheckInput.email = false;
            inputRefs.email.current.focus();
            newErrorMessages.email = 'Email không được để trống';
            isValid = false;
        }

        setObjCheckInput(newObjCheckInput);
        setErrorMessages(newErrorMessages);

        return isValid;
    };

    useEffect(() => {
        async function fetchData() {
            if (!currentUser) {
                navigate('/');
            } else {
                const response = await teacherService.getPersonalInfo(currentUser.data.person.id);
                if (response.data) {
                    const fetchedUser = response.data.data.data;
                    setUser({
                        id: fetchedUser.id || '',
                        fullName: fetchedUser.fullName || '',
                        sex: fetchedUser.sex || '',
                        birthDay: fetchedUser.birthDay || '',
                        cityBorn: fetchedUser.cityBorn || '',
                        address: fetchedUser.address || '',
                        phoneNumber: fetchedUser.phoneNumber || '',
                        email: fetchedUser.email || ''
                    });
                    console.log('Fetched user data:', response.data);
                }
                setLoading(false);
            }
        }
        fetchData();
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        if (isValidInputs()) {
            try {
                console.log('Fetching current user data...');
                const currentUserData = (await teacherService.getPersonalInfo(currentUser.data.person.id)).data.data.data;
                // Merge the updated fields with the current user data
                console.log('Current user data:', currentUserData);
                const updatedUser = {
                    ...currentUserData,
                    id: user.id,
                    fullName: user.fullName,
                    sex: user.sex,
                    birthDay: user.birthDay,
                    cityBorn: user.cityBorn,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    email: user.email
                };
    
                console.log('Updating personal info with data:', updatedUser);
                toast.success('Cập nhật thông tin thành công');
                const response = await teacherService.updatePersonalInfo(updatedUser);
                console.log('Save response:', response);
    
                // Handle success, e.g., show a success message or navigate to another page
            } catch (error) {
                console.error('Error updating personal info:', error);
                // Handle error, e.g., show an error message
                toast.error('Cập nhật thông tin thất bại');
            }
        } else {
            console.log('Invalid inputs', user);
        }
    };
    
    

    const handleInput = (name) => {
        setObjCheckInput({ ...objCheckInput, [name]: true });
        setErrorMessages({ ...errorMessages, [name]: '' });
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="container" style={{ marginTop: 80, zIndex: 20 }}>
                    <div className="card bg-light text-black p-4">
                        <div className='row'>
                            <h3>Cập nhật thông tin giảng viên</h3>
                            <hr className='mb-3 mt-2'></hr>
                            <div className='col-md-12'>
                                <div className="form-group mb-3 col-md-4">
                                    <label>MSSV:</label>
                                    <input type="text" name="id" value={user.id} onChange={handleChange} disabled className="form-control" />
                                </div>
                                <div className="form-group mb-3 col-md-4">
                                    <label>Họ tên:</label>
                                    <input type="text" name="fullName" value={user.fullName} onChange={handleChange} disabled className="form-control" />
                                </div>
                                <div className="form-group mb-3 col-md-4">
                                    <label>Giới tính:</label>
                                    <input type="text" name="sex" value={user.sex ? 'Nam' : 'Nữ'} onChange={handleChange} disabled className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Ngày sinh:
                                        <input type="date" name="birthDay" value={user.birthDay} onChange={handleChange} onInput={() => handleInput('birthDay')} ref={inputRefs.birthDay} className={`form-control ${!objCheckInput.birthDay ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errorMessages.birthDay}</div>
                                    </label>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Nơi sinh:
                                        <input type="text" name="cityBorn" value={user.cityBorn} onChange={handleChange} onInput={() => handleInput('cityBorn')} ref={inputRefs.cityBorn} className={`form-control ${!objCheckInput.cityBorn ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errorMessages.cityBorn}</div>
                                    </label>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Địa chỉ liên hệ:
                                        <input type="text" name="address" value={user.address} onChange={handleChange} onInput={() => handleInput('address')} ref={inputRefs.address} className={`form-control ${!objCheckInput.address ? 'is-invalid' : ''}`} size="50" />
                                        <div className="invalid-feedback">{errorMessages.address}</div>
                                    </label>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Số điện thoại:
                                        <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} onInput={() => handleInput('phoneNumber')} ref={inputRefs.phoneNumber} className={`form-control ${!objCheckInput.phoneNumber ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errorMessages.phoneNumber}</div>
                                    </label>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email:
                                        <input type="email" name="email" value={user.email} onChange={handleChange} onInput={() => handleInput('email')} ref={inputRefs.email} className={`form-control ${!objCheckInput.email ? 'is-invalid' : ''}`} size="50" />
                                        <div className="invalid-feedback">{errorMessages.email}</div>
                                    </label>
                                </div>
                                <button onClick={handleSave} className="btn btn-primary">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateSuggestionPageReacher;
