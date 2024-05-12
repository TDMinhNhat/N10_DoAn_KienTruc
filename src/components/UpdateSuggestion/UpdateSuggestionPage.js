import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateSuggestionPage = ({ currentUser }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(currentUser ? currentUser.data.person : {});

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
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultObjCheckInput);

    const inputRefs = {
        birthDay: useRef(),
        cityBorn: useRef(),
        address: useRef(),
        phoneNumber: useRef(),
        email: useRef()
    };

    const isValidInputs = () => {
        setObjCheckInput(defaultObjCheckInput);
        setErrorMessages({
            birthDay: '',
            cityBorn: '',
            address: '',
            phoneNumber: '',
            email: ''
        });

        if (user.birthDay === '') {
            setObjCheckInput({ ...objCheckInput, birthDay: false });
            inputRefs.birthDay.current.focus();
            setErrorMessages({ ...errorMessages, birthDay: 'Ngày sinh không được để trống' });
            return false;
        }
        if (user.cityBorn === '') {
            setObjCheckInput({ ...objCheckInput, cityBorn: false });
            inputRefs.cityBorn.current.focus();
            setErrorMessages({ ...errorMessages, cityBorn: 'Nơi sinh không được để trống' });
            return false;
        }
        if (user.address === '') {
            setObjCheckInput({ ...objCheckInput, address: false });
            inputRefs.address.current.focus();
            setErrorMessages({ ...errorMessages, address: 'Địa chỉ không được để trống' });
            return false;
        }
        if (user.phoneNumber === '') {
            setObjCheckInput({ ...objCheckInput, phoneNumber: false });
            inputRefs.phoneNumber.current.focus();
            setErrorMessages({ ...errorMessages, phoneNumber: 'Số điện thoại không được để trống' });
            return false;
        }
        if (user.email === '') {
            setObjCheckInput({ ...objCheckInput, email: false });
            inputRefs.email.current.focus();
            setErrorMessages({ ...errorMessages, email: 'Email không được để trống' });
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        } else {
            setUser(currentUser.data.person);
        }
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        if (isValidInputs()) {
            console.log('Save', user);
        } else {
            console.log('Invalid inputs', user);
        }
    };

    const handleInput = (name) => {
        setObjCheckInput({ ...objCheckInput, [name]: true });
        setErrorMessages({ ...errorMessages, [name]: '' });
    }

    return (
        <div>
            {currentUser && (
                <div className="container mt-4">
                    <div className="card bg-light text-black p-4">
                        <div className='row'>
                            <h3>Cập nhật thông tin sinh viên</h3>
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
                                <button onClick={handleSave} className="btn btn-primary">Lưu</button>                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default UpdateSuggestionPage;