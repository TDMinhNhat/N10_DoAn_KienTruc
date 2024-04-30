import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {toast} from "react-toastify";
import AuthService from '../../services/auth.service'

const Login = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState(location.state?.username || '');
    const [password, setPassword] = useState(location.state?.password || '');

    const handleCreateNewAccount = () => {
        navigate("/register");
    };

    const defaultObjValidInput = {
        isValidUsername : true,
        isValidPassword : true
    }
    const [objValidInput , setObjValidInput] = useState(defaultObjValidInput);

    const handleSubmit = async (e) => {
        setObjValidInput(defaultObjValidInput);

        if(!username){
            setObjValidInput({...defaultObjValidInput, isValidUsername : false});
            toast.error("Please enter email or phone number");
            return;
        }
        if(!password){
            setObjValidInput({...defaultObjValidInput , isValidPassword : false});
            toast.error("Please enter password");
            return;
        }
        e.preventDefault();
        try {
            const response = await AuthService.login(username, password);
            if (response.status === 200) {
                props.onLogin(response.data);
                console.log('check',response.data);
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error('Invalid username or password');
        }
    }

    return ( 
    <div className="login-container">
        <div className="container">
        <div className="row px-3 px-sm-0">
                <div className="content-left col-12 d-none col-sm-7 d-sm-block ">
                    <div className="brand">Login</div>
                    <div className="detail">Hello word</div>
                </div>
                <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                    <div className="brand d-sm-none">Login</div>
                    <input
                        type="text"
                        className={objValidInput.isValidUsername  ? "form-control" : "is-invalid form-control"}
                        placeholder="Email address or phone number"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value)}}
                    />
                    <input
                        type="password"
                        className={objValidInput.isValidPassword ? "form-control" : "is-invalid form-control "}
                        placeholder="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                     <button className="btn btn-primary" onClick={handleSubmit}>
                        Login
                    </button>
                    <hr />
                    <div className="text-center">
                        <button className="btn btn-success" onClick={handleCreateNewAccount}>
                            Create new account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;