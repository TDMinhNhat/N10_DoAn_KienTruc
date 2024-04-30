import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import AuthService from '../../services/auth.service';
import { toast } from 'react-toastify'; // Toastify: là một thư viện thông báo

const Register = (props) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        let check = isValidInputs();
        e.preventDefault();
        if(check === true){
            try {
                const response = await AuthService.register(username, password);
                if (response.status === 201) {
                    navigate('/', { state: { username, password } });
                }
            } catch (error) {
                toast.error('Username already exists');
            }
        }
    };

    // function register
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultObjCheckInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultObjCheckInput);

    // function validate 
    const isValidInputs = () => {
        setObjCheckInput(defaultObjCheckInput);
        if (email === "") {
            toast.error("Email is required");
            setObjCheckInput({ ...defaultObjCheckInput, isValidEmail: false });
            return false;
        }
        
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            setObjCheckInput({ ...defaultObjCheckInput, isValidEmail: false });
            toast.error("Email is invalid");
            return false;
        }

        if (phone === "") {
            toast.error("Phone is required");
            setObjCheckInput({ ...defaultObjCheckInput, isValidPhone: false });
            return false;
        }
        if (password === "") {
            toast.error("Password is required");
            setObjCheckInput({ ...defaultObjCheckInput, isValidPassword: false });
            return false;
        }
        if(password !== confirmPassword){
            toast.error("Password and confirm password must be the same");
            setObjCheckInput({ ...defaultObjCheckInput, isValidConfirmPassword: false });
            return false;
        }
      
        return true;
    };
    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block ">
                        <div className="brand">Register</div>
                        <div className="detail">Hello word</div>
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none">Login</div>

                        <div className="form-group">
                            <label >Email: </label>
                            <input
                                type="text"
                                className={objCheckInput.isValidEmail ? "form-control" : "form-control is-invalid"} 
                                placeholder="Email address "
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label >Phone number:</label>
                            <input
                                type="text"
                                className={objCheckInput.isValidPhone? "form-control" : "form-control is-invalid"} 
                                placeholder="Phone number"
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label >Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label >Password: </label>
                            <input
                                type="password"
                                className={objCheckInput.isValidPassword ? "form-control" : "form-control is-invalid"} 
                                placeholder="password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label >Re-enter password: </label>
                            <input
                                type="password"
                                className={objCheckInput.isValidConfirmPassword? "form-control" : "form-control is-invalid"} 
                                placeholder="Re-enter password"
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
